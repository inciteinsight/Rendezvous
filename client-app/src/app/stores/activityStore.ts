import { observable, action, computed} from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore {

    // observables
    @observable activities: IActivity[] = []
    @observable selectedActivity: IActivity | undefined
    @observable loadingInitial = false
    @observable editMode = false
    @observable submitting = false

    // computed - remember the get
    @computed get activitiesByStartDate() {
        return this.activities.sort((a, b) => 
        Date.parse(a.startDate) - Date.parse(b.startDate)
    )}

    // actions
    @action loadActivities = async () => {
        this.loadingInitial = true
        try {
            const activities = await agent.Activities.list()
                this.activities = activities.reduce((accum: IActivity[], activity) => {
                activity.startDate = activity.startDate.split('.')[0]
                activity.endDate = activity.endDate.split('.')[0]
                accum.push(activity)
                return accum
            },[])
            this.loadingInitial = false
        } catch (error) {
            this.loadingInitial = false
            console.error(error)
        }
    }
    
    @action createActivity = async (activity: IActivity) => {
        this.submitting = true
        try {
            await agent.Activities.create(activity)
            this.activities.push(activity)
            this.editMode = false
            this.submitting = false
        } catch (error) {
            this.submitting = false
            console.error(error)
        }
    }

    @action openCreateForm = () => {
        this.editMode = true
        this.selectedActivity = undefined
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(act => act.id === id)
        this.editMode = false;
    }
}

export default createContext(new ActivityStore())