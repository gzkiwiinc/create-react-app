import * as React from 'react';
import { logEventToAmplitude, AMPLITUDE_EVENT_PROPERTIES, formatDateTime, TimestampTracker, createPageUnloadHandler } from './Amplitude';
import { store } from 'src/boot-client';
import { SetPageUnloadHandler } from 'src/store/application/actions';

export default function <P>(
	pageName: string,
	ON_MOUNT_EVENT_NAME: string,
	ON_UNMOUNT_EVENT_NAME: string,
	trackEnterOnUpdate?: boolean,		// track enter event either on update or on mount
): (WrappedComponent: React.ClassType<P, any, any>) => React.ClassType<P, any, any>
{
	return (WrappedComponent) =>
	{
		class Component extends React.PureComponent<{}, {}> {
			componentDidMount()
			{
				// setup event track
				if (!trackEnterOnUpdate)
				{
					logEventToAmplitude(ON_MOUNT_EVENT_NAME, {
						[AMPLITUDE_EVENT_PROPERTIES.TIMESTAMP]: formatDateTime(),
					});
					TimestampTracker.getInstance().setStartTime(pageName);
				}
				const handler = createPageUnloadHandler();
				store.dispatch(new SetPageUnloadHandler(handler.bind(this, ON_UNMOUNT_EVENT_NAME, pageName)));
			}
			componentWillUnmount()
			{
				const total = pageName ? TimestampTracker.getInstance().getTotalTime(pageName) : null;
				logEventToAmplitude(ON_UNMOUNT_EVENT_NAME, {
					[AMPLITUDE_EVENT_PROPERTIES.TIMESTAMP]: formatDateTime(),
					[AMPLITUDE_EVENT_PROPERTIES.TOTAL_STAY_TIME]: total,
				});
				// clear page unload unhandler
				store.dispatch(new SetPageUnloadHandler());
			}

			public render()
			{
				return (
					<WrappedComponent {...this.props} />
				);
			}
		}

		return Component as any;
	};
}