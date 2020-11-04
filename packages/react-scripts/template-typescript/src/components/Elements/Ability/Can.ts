import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { Ability, RawRuleOf, detectSubjectType } from '@casl/ability';
import { PermissionAction, PermissionSubject } from 'src/http/Types';

type Actions = PermissionAction | 'manage';
type Subjects = PermissionSubject | 'all';
export type AppAbility = Ability<[Actions, Subjects]>
export type AppAbilityRules = RawRuleOf<AppAbility>[]

// Default to forbid any operations
export const defaultAbility: AppAbility = createAbilityInstance([
	{
		action: 'manage',
		subject: 'all',
		inverted: true,
	},
]);

/**
 * 获取subjectName， 如果subject为对象， 则取subject.subject作为subjectName
 * @param subject
 */
function subjectName(subject)
{
	if (subject && typeof subject === 'object' && subject.subject)
	{
		return subject.subject;
	}

	return detectSubjectType(subject);
}

/**
 * 创建Ability实例
 * @param rules - 规则
 */
export function createAbilityInstance(rules: AppAbilityRules)
{
	return new Ability<[Actions, Subjects]>(rules, { detectSubjectType: subjectName })
}

/**
 * 更新Ability规则
 * 需要注意的是使用ability.update更新实例是不会触发react重新渲染的
 * 如需要重新渲染请使用createAbilityInstance创建一个新的ability实例来更新规则。
 * @param ability - ability实例
 * @param rules - 规则
 */
export function updateAbilityRules(ability: AppAbility, rules: AppAbilityRules)
{
	ability && ability.update(rules)
}

export const AbilityContext: any = createContext({});
export const Can = createContextualCan(AbilityContext.Consumer);

export default Can;
