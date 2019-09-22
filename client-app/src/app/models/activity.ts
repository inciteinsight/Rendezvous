export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    startDate: Date;
    endDate:  Date;
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
    startTime?: Date;
    endTime?: Date;
}