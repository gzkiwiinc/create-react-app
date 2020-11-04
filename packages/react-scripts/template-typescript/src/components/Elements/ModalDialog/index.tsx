import * as React from "react";

/**
 * 获取带泛型的函数返回值
 * 参考: https://www.coder.work/article/1320854
 * 使用一个泛型类和一个绑定到函数返回类型的字段。然后我们可以提取类的字段。
 * 因为类可以在类型表达式中指定泛型类型参数，所以我们可以提取返回类型的泛型形式：
 */
class Helper<T> {
	ReturnType = createModalDialog<T>()
}
type FuncReturnType<T> = Helper<T>['ReturnType']
// 不能使用：`type ModalDialogClass = InstanceType<ReturnType<typeof createModalDialog>>`
// 因为 typeof 会使 createModalDialog 的泛型丢失， 最终的类型会是 createModalDialog<unknown>.ModalDialog
export type ModalDialogClass<T = any> = InstanceType<FuncReturnType<T>>

export interface ModalDialogProps
{
	visible: boolean
	hide: () => void;
	show: () => void;
}

interface State
{
	visible: boolean;
}

export function createModalDialog<Props>(
	WrappedComponent?: React.ComponentType<Props & ModalDialogProps>,
)
{
	return class ModalDialog extends React.Component<Props, State> {
		constructor(props: Props)
		{
			super(props)
			this.state = {
				visible: false,
			}
		}

		componentWillUnmount()
		{
			this.hide()
		}

		public hide = () =>
		{
			this.setState({ visible: false })
		}

		public show = () =>
		{
			this.setState({ visible: true })
		}

		public render()
		{
			return (
				WrappedComponent ? <WrappedComponent
					{...this.props}
					visible={this.state.visible}
					hide={this.hide}
					show={this.show}
				>
					{this.props.children || null}
				</WrappedComponent> : null
			)
		}
	}
}

export default createModalDialog;
