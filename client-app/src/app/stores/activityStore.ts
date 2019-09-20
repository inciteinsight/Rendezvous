import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: "always"})

class ActivityStore {

    @observable activityRegistry = new Map()
    @observable activity: IActivity | null = null
    @observable loadingInitial = false
    @observable submitting = false
    @observable target =  ''

    @computed get activitiesByStartDate() {
        return this.groupActivitiesByStartDate(Array.from(this.activityRegistry.values()))
    }

    groupActivitiesByStartDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const startDate = activity.startDate.split('T')[0]
            activities[startDate] = activities[startDate] ? [...activities[startDate], activity] : [activity]
            return activities
        }, {} as {[key: string]: IActivity[]}))
    }

    @action loadActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id)
        if (activity) {
            this.activity = activity
        } else {
            this.loadingInitial = true
            try {
                activity = await agent.Activities.details(id)
                runInAction('loading activity', () => {
                    this.activity = activity
                    this.loadingInitial = false
                })
            } catch(error) {
                runInAction('loading activity error', () => {
                    this.loadingInitial = false
                })
                console.error(error)
            }
        }
    }

    @action loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list()
            runInAction('loading activities', () => {
                    activities.forEach(( activity) => {
                    activity.startDate = activity.startDate.split('.')[0]
                    activity.endDate = activity.endDate.split('.')[0]
                    this.activityRegistry.set(activity.id, activity)
                })
                this.loadingInitial = false

            })
        }   catch (error) {
            runInAction('load activities error',() => {
                this.loadingInitial = false
            })
            console.error(error)
        }
    }
    
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.create(activity)
            runInAction('creating activity', () => {
                this.activityRegistry.set(activity.id, activity)
                this.submitting = false
            })
        }   catch (error) {
            runInAction('creating activity error', () => {
                this.submitting = false
            })
            console.error(error)
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.update(activity)
            runInAction('updating activity', () => {
                this.activityRegistry.set(activity.id, activity)
                this.activity = activity
                this.submitting = false
            })
        }   catch (error) {
            runInAction('error updating activity', () => {
                this.submitting = false
            })
            console.error(error)
        }        
    }

    @action clearActivity = () => {
        this.activity = null
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true
        this.target = event.currentTarget.name
        try {
            await agent.Activities.delete(id)
            runInAction('deleting activity', () => {
                this.activityRegistry.delete(id)
                this.submitting = false
                this.target = ''
            })
        } catch (error) {
            runInAction('deleting activity error', () => {
                this.submitting = false
                this.target = ''
            })
            console.error(error)
        }
    }
}

export default createContext(new ActivityStore())