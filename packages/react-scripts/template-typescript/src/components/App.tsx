import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Spin } from "antd";
import "src/styles/app.scss";
import { IAppState } from "src/store";
import { ILoading } from 'src/store/application/reducers';
import { injectIntl } from 'react-intl';
import { DefaultInjectedIntlProps } from 'src/components/Elements/Message/index';

interface Props extends RouteComponentProps<{}, {}>
{
}

interface ConnectedProps
{
	loading: ILoading
}

class App extends React.PureComponent<Props & ConnectedProps & DefaultInjectedIntlProps, {}>
{

	public render()
	{
		const { loading, intl } = this.props
		return (
			<div className="main">
				<Spin
					spinning={loading.visible}
					tip={loading.text || intl.formatMessage({ id: 'LOADING' })}
					size="large"
				/>
				{this.props.children}
			</div>
		);
	}
}

const mapStateToProps = (state: IAppState) =>
{
	return {
		loading: state.application.loading
	};
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
	}, dispatch)
})

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
