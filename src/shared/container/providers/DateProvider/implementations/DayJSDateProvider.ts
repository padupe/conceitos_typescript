import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);


class DayJSDateProvider implements IDateProvider {
        
    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate();
    };

    addHours(hours: number): Date {
        return dayjs().add(hours, 'hour').toDate();
    };
    
    compareIfBefore(stard_date: Date, end_date: Date): boolean {
        return dayjs(stard_date).isBefore(end_date);
    };

    compareInHours(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);
        
        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    };

    compareInDays(start_date: Date, end_date: Date): number {
        const start_date_utc = this.convertToUTC(start_date);
        const end_date_utc = this.convertToUTC(end_date);
        
        return dayjs(end_date_utc).diff(start_date_utc, "days");
    };

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    };

    dateNow(): Date {
        return dayjs().toDate();
    };

};

export { DayJSDateProvider };