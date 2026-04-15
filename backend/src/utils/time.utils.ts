import moment from 'moment';

export namespace TimeUtils {
	/**
	 * Get this moment date in UTC0.
	 */
	export const getNowUTC = (): string => {
		const dateUTC: string = moment().utc().format();
		return dateUTC;
	};

	/**
	 * Get this moment date in ISO.
	 */
	export const getNowISO = (): string => {
		const dateISO: string = moment().utc().toISOString();
		return dateISO;
	};

	/**
	 * Get date year.
	 */
	export const getYear = (date: string): number => {
		const dateMoment: any = moment(date);
		const year: number = dateMoment.year();
		return year;
	};

	/**
	 * Get date month.
	 */
	export const getMonth = (date: string): number => {
		const dateMoment: any = moment(date);
		const month: number = dateMoment.month() + 1;
		return month;
	};

	/**
	 * Get date day.
	 */
	export const getDay = (date: string): number => {
		const dateMoment: any = moment(date);
		const day: number = dateMoment.date();
		return day;
	};

	/**
	 * Get date hour.
	 */
	export const getHour = (date: string): number => {
		const dateMoment: any = moment(date);
		const hour: number = dateMoment.hour();
		return hour;
	};

	/**
	 * Get date minutes.
	 */
	export const getMinutes = (date: string): number => {
		const dateMoment: any = moment(date);
		const minutes: number = dateMoment.minutes();
		return minutes;
	};

	/**
	 * Get date seconds.
	 */
	export const getSeconds = (date: string): number => {
		const dateMoment: any = moment(date);
		const seconds: number = dateMoment.seconds();
		return seconds;
	};

	/**
	 * Get date milliseconds.
	 */
	export const getMilliseconds = (date: string): number => {
		const dateMoment: any = moment(date);
		const milliseconds: number = dateMoment.milliseconds();
		return milliseconds;
	};

	/**
	 * Check whether or not the given date is before this moment.
	 */
	export const isDateBeforeNow = (date: string): boolean => {
		const dateMoment: any = moment(date);
		const now: any = moment();
		const result: boolean = dateMoment.isBefore(now);
		return result;
	};

	/**
	 * Transform the given date to UTC.
	 */
	export const dateToUTC = (date: string, resetSeconds: boolean = false): string => {
		const dateMoment: any = resetSeconds ? moment(date).seconds(0).milliseconds(0) : moment(date);
		const dateUTC: string = dateMoment.utc().format();
		return dateUTC;
	};

	/**
	 * Transform the given date to ISO.
	 */
	export const dateToISO = (date: string, resetSeconds: boolean = false): string => {
		const dateMoment: any = resetSeconds ? moment(date).seconds(0).milliseconds(0) : moment(date);
		const dateISO: string = dateMoment.utc().toISOString();
		return dateISO;
	};

	/**
	 * Transform the given date to Unix seconds.
	 */
	export const dateToUnixSeconds = (date: string): number => {
		return Math.floor(moment(date).valueOf() / 1000);
	};

	/**
	 * Transform a duration (timestep and timeunit) to milliseconds.
	 */
	export const durationToMilliseconds = (timestep: number, timeunit: string): number => {
		const ms: number = moment.duration(timestep, timeunit as any).asMilliseconds();
		return ms;
	};

	/**
	 * Calculate a new date given a duration (timestep and timeunit).
	 */
	export const calculateDate = (date: string, timestep: number, timeunit: string): string => {
		const dateMoment: any = moment(date);
		const newMoment: any =
			timestep && timeunit
				? timestep >= 0
					? dateMoment.add(timestep, timeunit)
					: dateMoment.subtract(Math.abs(timestep), timeunit)
				: dateMoment;
		const newDate: string = newMoment.utc().format();
		return newDate;
	};

	/**
	 * Sort two dates.
	 * Return -1 if the first date is before the second date.
	 * Return 0 if they are the same.
	 * Return +1 otherwise.
	 */
	export const sortDates = (dateA: string, dateB: string): number => {
		const momentA: any = moment(dateA);
		const momentB: any = moment(dateB);
		const result: number = momentA.isBefore(momentB) ? -1 : momentA.isSame(momentB) ? 0 : 1;
		return result;
	};

	/**
	 * Format a date to a scheduler at expression.
	 * At expression: yyyy-mm-ddThh:mm:ss
	 */
	export const formatSchedulerAtExpression = (date: string): string => {
		const dateMoment: any = moment(date);
		const newDate: string = dateMoment.utc().format('YYYY-MM-DDTHH:mm');
		return newDate;
	};

	/**
	 * Format a date to a scheduler cron expression.
	 * Cron expression: minutes hours day_of_month month day_of_week year
	 * Cron reference: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html
	 */
	export const formatSchedulerCronExpression = (date: string): string => {
		const dateMoment: any = moment(date);
		const minutes: string = dateMoment.format('mm');
		const hours: string = dateMoment.format('HH');
		const weekday: number = dateMoment.weekday() + 1;
		const expression: string = `${minutes} ${hours} ? * ${weekday} *`;
		return expression;
	};
}
