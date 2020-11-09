import React from 'react'
import { injectIntl } from 'react-intl'
import { DefaultInjectedIntlProps } from 'src/components/Elements/Message'
import styles from 'src/styles/pages/home/exception/no-service/index.module.scss'

class NoService extends React.Component<DefaultInjectedIntlProps, {}>
{
	render()
	{
		return (
			<div className={`${styles.noservice}`} >
				<span className={`${styles.exceptionText}`}>
					NO_SERVICE
				</span>
			</div>
		)
	}
}

export default injectIntl(NoService)
