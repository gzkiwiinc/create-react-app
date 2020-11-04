import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { URLS } from 'src/constants/urls'
import { PermissionAction, PermissionSubject } from 'src/http/Types'
import { AppAbility } from 'src/components/Elements/Ability/Can';

/**
 * 权限路由过滤
 */
const PermissionRoute = ({ component, ...rest }) =>
{
	const ability: AppAbility = rest.ability
	const permissionAction: PermissionAction = rest.permissionAction
	const permissionSubject: PermissionSubject = rest.permissionSubject

	if (ability && permissionAction && permissionSubject && ability.cannot(permissionAction, permissionSubject))
	{
		return <Redirect to={URLS.NOT_PERMISSION_EXCEPTION} />
	}

	return <Route component={component} {...rest} />
}

export default PermissionRoute