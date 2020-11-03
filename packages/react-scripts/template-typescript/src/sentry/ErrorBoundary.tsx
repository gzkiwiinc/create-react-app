import * as React from 'react';
import * as Sentry from '@sentry/browser';

const ignoreSentry = process.env.IGNORE_SENTRY === 'true';

/**
 * 捕获组件异常，例如：
 * 1. 渲染过程中异常
 * 2. 生命周期方法中的异常
 * 3. 子组件树中各组件的constructor构造函数中异常
 * 注: 无法捕获 **其他异常**，例如：
 * 1. 事件处理器中的异常
 * 2. 异步任务异常，如setTiemout，ajax请求异常等
 * 3. 服务端渲染异常
 * 4. 异常边界组件自身内的异常
 */
export default class ErrorBoundary extends React.Component<{}, {
	hasError: boolean,
	eventId?: string,
}>
{
	componentDidCatch(error, errorInfo)
	{
		if (!ignoreSentry)
		{
			Sentry.withScope((scope) =>
			{
				scope.setExtras(errorInfo);
				Sentry.captureException(error);
			});
		}
	}

	render()
	{
		return this.props.children;
	}
}
