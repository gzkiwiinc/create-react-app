import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import createRoutes from './route';
import configureStore from './configureStore';
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';
import IntlContainer from "./components/Elements/IntlContainer";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import HttpManager from './http/HttpManager'
import ErrorBoundary from './sentry/ErrorBoundary'
import { initSentry } from './sentry/index';
import '@babel/polyfill'

/**
 * resolve the issues that crash in browser which base on X5 kernel
 * see https://github.com/ant-design/ant-design-pro/issues/2149#issuecomment-418254535
 */
global.Intl = require('intl');
(window as any).Intl = require('intl');

// @todo set sentry dsn
initSentry('')

// @todo set bassename
const history = createBrowserHistory({ basename: "mesh-react-app" })

export const store = configureStore(history);

const routes = createRoutes(store);

HttpManager.getInstance().init(store);

const render = () =>
{
	ReactDOM.render(
		<ErrorBoundary>
			<AppContainer>
				<Provider store={store}>
					<IntlContainer locale={store.getState().application.locale}>
						<ConfigProvider autoInsertSpaceInButton={false} locale={store.getState().application.locale === 'zh-CN' ? zhCN : enUS}>
							<Router history={history} >{routes}</Router>
						</ConfigProvider>
					</IntlContainer>
				</Provider>
			</AppContainer>
		</ErrorBoundary>,
		document.getElementById('react-app')
	);
}

render();
