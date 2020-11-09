import React from 'react'
import { injectIntl } from 'react-intl'
import { DefaultInjectedIntlProps } from 'src/components/Elements/Message'
import styles from 'src/styles/pages/home/exception/not-permission/index.module.scss'

class NotPermission extends React.Component<DefaultInjectedIntlProps, {}>
{
	render()
	{
		return (
			<div className={`${styles.notpermission}`} >
				<span className={`${styles.exceptionText}`}>
					NOT_PERMISSION
				</span>
			</div>
		)
	}
}

export default injectIntl(NotPermission)
