import * as React from "react";
import { connect } from 'react-redux';
import { AbilityContext, AppAbility } from './Can';
import { bindActionCreators } from 'redux';
import { IAppState } from 'src/store/index';

interface ConnectedProps
{
	ability: AppAbility,
}

export class AbilityContainer extends React.PureComponent<ConnectedProps, {}> {
	public render()
	{
		return (
			<AbilityContext.Provider value={this.props.ability}>
				{this.props.children}
			</AbilityContext.Provider>
		);
	}
}

const mapStateToProps = (state: IAppState) =>
{
	return {
		ability: state.application.ability
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
	}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AbilityContainer);
