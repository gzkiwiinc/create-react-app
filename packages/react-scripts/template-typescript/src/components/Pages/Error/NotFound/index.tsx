
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from 'src/store';
import Message from 'src/components/Elements/Message/index';

class NotFound extends React.Component<{}, {}>
{
	public render()
	{
		return (
			<div>
				<div style={{ position: "absolute", zIndex: 1000 }}>{Message('PAGE_NOT_FOUND')}</div>
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState) =>
{
	return {
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
	}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);