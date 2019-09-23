export interface IActivity {
    id: string
    title: string
    description: string
    category: string
    startDate: Date
    endDate:  Date
    city: string
    venue: string
}

export interface IActivityFormValues extends Partial<IActivity> {
    startTime?: Date
    endTime?: Date
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined
    title: string = ''
    category: string = ''
    description: string = ''
    startDate?: Date = undefined
    endDate?: Date = undefined
    startTime?: Date = undefined
    endTime?: Date = undefined
    city: string = ''
    venue: string = ''

    constructor(activity?: IActivityFormValues) {
        if (activity && activity.startDate) {
            activity.startTime = activity.startDate
        }
        if (activity && activity.endDate) {
            activity.endTime = activity.endDate
        }
        Object.assign(this, activity)
    }
}