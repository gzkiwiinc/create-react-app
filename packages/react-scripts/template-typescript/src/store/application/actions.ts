import { ReactNode } from 'react';
import { TypeName, StrongAction } from '../../common/StrongAction'
import { IAlert, ILoading } from './reducers';
import { AppAbilityRules } from 'src/components/Elements/Ability/Can';

@TypeName('SET_LOADING')
export class SetLoadingAction extends StrongAction
{
	constructor(public payload: ILoading)
	{
		super();
	}
}

@TypeName('SHOW_ALERT')
export class ShowAlertAction extends StrongAction
{
	constructor(public payload: IAlert)
	{
		super();
	}
}

@TypeName('CLOSE_ALERT')
export class CloseAlertAction extends StrongAction
{
}

@TypeName('SET_PAGE_UNLOAD_HANDLER')
export class SetPageUnloadHandler extends StrongAction
{
	constructor(public handler?: () => void)
	{
		super();
	}
}

@TypeName('UPDATE_ABILITY')
export class UpdateAbilityAction extends StrongAction
{
	constructor(public payload: AppAbilityRules)
	{
		super()
	}
}

export interface IApplicationAction
{
	showLoading: (text?: string) => any;
	hideLoading: () => any;
	showAlert: (title: string | ReactNode, content: string | ReactNode) => any;
	closeAlert: () => any;
	updateAbility: (rules?: AppAbilityRules) => any;
}

export const actionCreators: IApplicationAction = {
	showLoading: (text?: string): any => dispatch => dispatch(new SetLoadingAction({ visible: true, text })),
	hideLoading: (): any => dispatch => dispatch(new SetLoadingAction({ visible: false })),
	showAlert: (title: string | ReactNode, content: string | ReactNode): any => dispatch => dispatch(new ShowAlertAction({
		title, content, visible: true
	})),
	closeAlert: (): any => dispatch => dispatch(new CloseAlertAction()),
	updateAbility: (rules?: AppAbilityRules): any => async (dispatch, getState) =>
	{
		rules && dispatch(new UpdateAbilityAction(rules))
	},
}