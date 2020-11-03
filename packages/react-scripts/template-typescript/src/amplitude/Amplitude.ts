// tslint:disable-next-line no-submodule-imports
import amplitude from 'amplitude-js/browser/amplitude';
import dayjs from 'dayjs';

(window as any).amplitude = amplitude;
amplitude && process.env.AMPLITUDE_KEY && amplitude.getInstance().init(process.env.AMPLITUDE_KEY, null, { apiEndpoint: 'api2.amplitude.com' });

/**
 * Call this method to send a request over Amplitude and log events
 *
 * @param {string} event - type of event being logged
 * @param {object} eventProps - customized event properties being logged
 */
function logEventToAmplitude(event: string, eventProps?: object)
{
	try
	{
		// guard our app from amplitude tracking, but also log errors
		if (eventProps)
		{
			amplitude && amplitude.getInstance().logEvent(event, eventProps);
		}
		else
		{
			amplitude && amplitude.getInstance().logEvent(event);
		}
	}
	catch (err)
	{
		console.error('Amplitude Error', err)
		// @todo - send error to sentry
	}
}

export const getAmplitudeOption = (key: string) =>
{
	return amplitude.getInstance().options[key];
}

export const setAmplitudeUserId = (userId?: number) =>
{
	userId && amplitude.getInstance().setUserId(userId)
}

export const now = () =>
{
	return new Date().getTime();
}

export const formatDateTime = (ts?: number, format?: string) =>
{
	const datetime = ts ? dayjs(ts) : dayjs(new Date());
	return datetime.format(format || 'YYYY-MM-DD HH:mm:ss');
}

export const createPageUnloadHandler = () =>
{
	return (eventType: string, pageName?: string) =>
	{
		if (!!window.navigator.sendBeacon)
		{
			const exitTime = now();
			const data = {
				api_key: process.env.AMPLITUDE_KEY,
				events: [
					{
						user_id: amplitude.getInstance().options.userId,
						device_id: amplitude.getInstance().options.deviceId,
						event_type: eventType,
						time: exitTime,
						event_properties: {
							[AMPLITUDE_EVENT_PROPERTIES.USER_ID]: amplitude.getInstance().options.userId,
							[AMPLITUDE_EVENT_PROPERTIES.TIMESTAMP]: formatDateTime(exitTime),
							[AMPLITUDE_EVENT_PROPERTIES.TOTAL_STAY_TIME]: pageName ? TimestampTracker.getInstance().getTotalTime(pageName, exitTime) : null,
							// indicate that this is a page unload type of exit
							[AMPLITUDE_EVENT_PROPERTIES.PAGE_UNLOAD]: true,
						},
						platform: amplitude.getInstance().options.platform,
						// need to grab more information if needed, refer to this doc if needed any more info - https://help.amplitude.com/hc/en-us/articles/360032842391-HTTP-API-V2
					}
				]
			};

			// 后端接口文档 - http://dev.meshkit.cn/kiwi-team/mesh-amplitude-service
			window.navigator.sendBeacon(process.env.AMPLITUDE_ENDPOINT || '', JSON.stringify(data));
		}
	}
}

export class TimestampTracker
{
	private static _tracker: TimestampTracker;
	private pageMap: { [key: string]: number };

	constructor()
	{
		this.pageMap = {};
	}

	public static getInstance()
	{
		if (!this._tracker)
		{
			this._tracker = new TimestampTracker();
		}
		return this._tracker;
	}

	public setStartTime(pageKey: string, ts?: number)
	{
		this.pageMap[pageKey] = ts || now();
	}
	public getStartTime(pageKey: string)
	{
		return this.pageMap[pageKey];
	}
	public getTotalTime(pageKey: string, endTS?: number)
	{
		if (!this.pageMap[pageKey]) return null;
		const total = (endTS || now()) - this.pageMap[pageKey];
		if (total < 0) return undefined;
		// clean up start time
		delete this.pageMap[pageKey]
		return total;
	}
}

const AMPLITUDE_EVENTS = {
};

const AMPLITUDE_EVENT_PROPERTIES = {
	TOTAL_STAY_TIME: 'total_stay_time',
	TIMESTAMP: 'timestamp',
	USER_ID: 'user_id',
	PAGE_UNLOAD: 'page_unload',
}

const AMPLITUDE_EVENT_PROPERTIES_VALUE = {
}

export
{
	AMPLITUDE_EVENTS,
	AMPLITUDE_EVENT_PROPERTIES,
	AMPLITUDE_EVENT_PROPERTIES_VALUE,
	logEventToAmplitude,
	amplitude,
}