interface IDateProvider {
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(stard_date: Date, end_date: Date): boolean;
    compareInHours(start_date: Date, end_date: Date): number;
    compareInDays(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
};

export { IDateProvider };