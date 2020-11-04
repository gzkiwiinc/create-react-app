import * as React from 'react'
import styles from 'src/styles/elements/modal-dialog/alertDialog.module.scss';
import { Modal } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';
import { store } from 'src/boot-client';
import Message from 'src/components/Elements/Message/index';
import { IntlContainer } from 'src/components/Elements/IntlContainer/index';
import Icon from 'src/components/Icon';

/**
 * 使用Antd Modal.method()创建Modal无法获取到context和redux，所以这里要支持国际化需要重新调用一下IntlContainer
 * https://ant.design/components/modal-cn/#FAQ
 */
function RenderWithIntl(props)
{
	return <IntlContainer locale={store.getState().application.locale}>
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
			{props.children}
		</div>
	</IntlContainer>
}

interface Prop
{
	text?: string | React.ReactNode;
	textArray?: string[];
	textAlign?: 'left' | 'center' | 'right';
	onClose?: (...args: any[]) => any;
}
class AlertDialog extends React.PureComponent<Prop, {}>
{
	private onClick = () =>
	{
		this.props.onClose && this.props.onClose()
	}
	render()
	{
		const { text, textArray, textAlign } = this.props
		return (
			<RenderWithIntl>
				<section className={`${styles.dialogContent}`}>
					<section className={styles.header}>
						<Icon width={16} name="ic-close" pointer onClick={this.onClick} />
					</section>
					<section className={styles.content} style={{ textAlign: textAlign || 'center' }}>
						{
							text ? <span>{text}</span> : null
						}

						{
							textArray ? textArray.map((item, index) => <span key={index}>{item}</span>) : null
						}
					</section>
				</section>
			</RenderWithIntl>
		)
	}
}

export interface IAlertDialogOptions extends ModalFuncProps
{
	text?: string | React.ReactNode;
	textArray?: string[];
	textAlign?: 'left' | 'center' | 'right';
	buttonType?: 'confirm' | 'info'; // confirm显示两个按钮， info显示一个按钮， 默认为confirm
	onClose?: (...args: any[]) => any;
}

export function showAlertDialog(options: IAlertDialogOptions)
{
	const { confirm, info } = Modal;
	const modalMethod = options.buttonType === 'info' ? info : confirm
	const okText = <RenderWithIntl>{options.okText || Message('CONFIRM')}</RenderWithIntl>
	const cancelText = <RenderWithIntl>{options.cancelText || Message('CANCEL')}</RenderWithIntl>
	let _modal: any = null
	const onClose = () =>
	{
		_modal && _modal.destroy();
		options.onClose && options.onClose()
	}
	_modal = modalMethod({
		...options,
		icon: null,
		className: styles.alertDialog,
		centered: true,
		maskClosable: false,
		content: <AlertDialog text={options.text} textArray={options.textArray} textAlign={options.textAlign} onClose={onClose} />,
		width: options.width || 660,
		okText,
		cancelText,
	})
}

export default showAlertDialog