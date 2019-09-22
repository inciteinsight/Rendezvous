export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    startDate: Date | null;
    endDate:  Date | null;
    city: string;
    venue: string;
}