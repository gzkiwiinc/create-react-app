import * as Sentry from '@sentry/browser';
import { IUser } from '../http/Types';

const pkg = require('../../package.json');

const ignoreSentry = process.env.IGNORE_SENTRY === 'true';

export const initSentry = (dsn: string) =>
{
	if (!ignoreSentry && dsn)
	{
		Sentry.init({
			release: `${process.env.NODE_ENV}-${pkg.version}`,
			dsn,
			environment: process.env.NODE_ENV,
		});
		windowErrorListener();
	}
}

export const windowErrorListener = () =>
{
	if (!ignoreSentry)
	{
		// 捕获事件处理器中的错误，以及异步错误
		window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) =>
		{
			Sentry.captureException(error || {
				event,
				source,
				lineno,
				colno
			});
		}

		// 捕获promise异常错误
		window.onunhandledrejection = error =>
		{
			Sentry.captureException(error);
		}
	}
}

export const setSentryUser = (currentUser: IUser | null) =>
{
	if (!ignoreSentry)
	{
		if (currentUser)
		{
			// set login user for Sentry
			Sentry.configureScope(scope =>
			{
				scope.setUser({
					id: `${currentUser.id}`,
					username: currentUser.username,
				})
			})
		}
		else
		{
			Sentry.configureScope(scope =>
			{
				scope.clear();
			});
		}
	}
}