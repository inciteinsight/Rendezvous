import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: "always"})

class ActivityStore {

    // observables
    @observable activityRegistry = new Map()
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined
    @observable loadingInitial = false
    @observable editMode = false
    @observable submitting = false
    @observable target =  '';

    // computed - remember the get
    @computed get activitiesByStartDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (a, b) => Date.parse(a.startDate) - Date.parse(b.startDate)
    )}

    // actions
    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = false;
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
                this.editMode = false
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
                this.selectedActivity = activity
                this.editMode = false
                this.submitting = false
            })
        }   catch (error) {
            runInAction('error updating activity', () => {
                this.submitting = false
            })
            console.error(error)
        }        
    }

    @action openCreateForm = () => {
        this.editMode = true
        this.selectedActivity = undefined
    }

    @action openEditForm = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
        this.editMode = true
    }

    @action cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    @action cancelFormOpen = () => {
        this.editMode = false
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