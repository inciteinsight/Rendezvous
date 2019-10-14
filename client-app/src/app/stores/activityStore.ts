import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

export default class ActivityStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

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
            (a, b) => a.startDate.getTime() - b.startDate.getTime()
        )
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const startDate = activity.startDate.toISOString().split('T')[0]
            activities[startDate] = activities[startDate] ? [...activities[startDate], activity] : [activity]
            return activities
        }, {} as {[key: string]: IActivity[]}))
    }

    @action loadActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id)
        if (activity) {
            this.activity = activity
            return activity
        } else {
            this.loadingInitial = true
            try {
                activity = await agent.Activities.details(id)
                runInAction('loading activity', () => {
                    this.activity = activity
                    this.activityRegistry.set(activity.id, activity)
                    this.loadingInitial = false
                })
                return activity
            } catch(error) {
                runInAction('loading activity error', () => {
                    this.loadingInitial = false
                })
                console.error(error);
            }
        }
    }

    @action loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list()
            runInAction('loading activities', () => {
                    activities.forEach((activity) => {
                    activity.startDate = new Date(activity.startDate)
                    activity.endDate = new Date(activity.endDate)
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
            history.push(`/activities/${activity.id}`)
        }   catch (error) {
            runInAction('creating activity error', () => {
                this.submitting = false
            })
            toast.error('Problem submitting data')
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
            history.push(`/activities/${activity.id}`)
        }   catch (error) {
            runInAction('error updating activity', () => {
                this.submitting = false
            })
            toast.error('Problem submitting data')
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
