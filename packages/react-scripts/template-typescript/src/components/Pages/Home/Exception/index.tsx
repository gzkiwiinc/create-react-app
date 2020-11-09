import React from 'react'
import { injectIntl } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import { DefaultInjectedIntlProps } from 'src/components/Elements/Message'
import { URLS } from 'src/constants/urls'
import styles from 'src/styles/pages/home/exception/index.module.scss'
import NotPermission from './NotPermission';
import NoService from './NoService';

class Exception extends React.Component<DefaultInjectedIntlProps, {}>
{
	render()
	{
		return (
			<section className={`${styles.exceptionpage}`} >
				<Switch>
					<Route path={URLS.NOT_PERMISSION_EXCEPTION} component={NotPermission} />
					<Route path={URLS.NO_SERVICE_EXCEPTION} component={NoService} />
				</Switch>
			</section>
		)
	}
}

export default injectIntl(Exception)
