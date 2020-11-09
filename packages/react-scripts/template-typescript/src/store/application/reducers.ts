import { ReactNode } from 'react';
import { ILocales } from '../../intl/index';
import { isActionType } from '../../common/StrongAction'
import { ShowAlertAction, CloseAlertAction, SetLoadingAction, SetPageUnloadHandler, UpdateAbilityAction } from './actions';
import { AppAbility, createAbilityInstance, defaultAbility } from 'src/components/Elements/Ability/Can';

export interface ILoading
{
	visible: boolean,
	text?: string,
}

export interface IAlert
{
	title: string | ReactNode,
	content: string | ReactNode,
	visible: boolean,
}

export interface IApplicationState
{
	alert: IAlert,
	loading: ILoading,
	locale: ILocales,
	ability: AppAbility,
	pageUnloadHandler?: () => void,
}

const initialAlertState: IAlert = {
	title: '',
	content: '',
	visible: false,
}

const initialState: IApplicationState = {
	alert: initialAlertState,
	loading: {
		visible: false
	},
	locale: "zh-CN",
	ability: defaultAbility,
}

export default function applicationReducer(state = initialState, action): IApplicationState
{
	if (isActionType(action, SetLoadingAction))
	{
		return {
			...state,
			loading: action.payload
		}
	}
	else if (isActionType(action, ShowAlertAction))
	{
		return {
			...state,
			alert: action.payload
		}
	}
	else if (isActionType(action, CloseAlertAction))
	{
		return {
			...state,
			alert: initialAlertState
		}
	}
	else if (isActionType(action, SetPageUnloadHandler))
	{
		return {
			...state,
			pageUnloadHandler: action.handler,
		};
	}
	else if (isActionType(action, UpdateAbilityAction))
	{
		console.log('Update Ability Rule:', action.payload)
		return {
			...state,
			ability: createAbilityInstance(action.payload)
		}
	}
	return state
}