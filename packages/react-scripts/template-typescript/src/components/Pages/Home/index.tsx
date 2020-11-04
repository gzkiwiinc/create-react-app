
import * as React from 'react';
import styles from 'src/styles/pages/home/index.module.scss';
import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { IAppState } from 'src/store';
import { URLS } from 'src/constants/urls';
import { bindActionCreators } from 'redux';
import Message from 'src/components/Elements/Message/index';
import Exception from './Exception';

// tslint:disable-next-line no-empty-interface
interface Props extends RouteComponentProps
{
}

class Home extends React.Component<Props, {}>
{

	public render()
	{
		return (
			<section className={`${styles.homepage}`}>
				<section className={`${styles.head}`}>
					{Message('HELLO_WORD')}
				</section>
				<section className={`${styles.body}`}>
					<Switch>
						<Route path={URLS.EXCEPTION} component={Exception} />
						<Redirect to={URLS.HOME} />
					</Switch>
				</section>
			</section>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));