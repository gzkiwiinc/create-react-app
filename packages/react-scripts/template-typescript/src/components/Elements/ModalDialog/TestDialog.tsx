
import * as React from 'react';
import styles from 'src/styles/elements/modal-dialog/testDialog.module.scss';
import { Modal } from 'antd';
import Icon from 'src/components/Icon'
import createModalDialog, { ModalDialogProps } from './index';

// tslint:disable-next-line no-empty-interface
interface Props
{
}

class TestDialog extends React.PureComponent<Props & ModalDialogProps, {}>
{
	render()
	{
		const { visible, hide } = this.props
		return (
			<Modal
				className={styles.testDialog}
				visible={visible}
				centered={true}
				footer={null}
				closeIcon={<Icon width={16} name="ic-close" pointer onClick={hide} />}
				maskClosable={true}
				width={400}
				onCancel={hide}
			>
				<div className={styles.dialogContent}>
					TEST
				</div>
			</Modal>
		)
	}
}

export default createModalDialog<Props>(TestDialog)
