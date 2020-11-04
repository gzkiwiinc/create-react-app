export enum ResponseCode
{
	/**
	 * 400 客户端指定了无效的参数。 检查错误消息和错误详细信息以获取更多信息。
	 */
	INVALID_ARGUMENT = 'INVALID_ARGUMENT',
	/**
	 * 400 请求不能在当前系统状态下执行，例如删除非空目录。
	 */
	FAILED_PRECONDITION = 'FAILED_PRECONDITION',
	/**
	 * 400 客户端指定了无效的范围。
	 */
	OUT_OF_RANGE = 'OUT_OF_RANGE',
	/**
	 * 409 并发冲突，例如读-修改-写冲突。
	 */
	ABORTED = 'ABORTED',
	/**
	 * 409 客户端尝试创建的资源已存在。
	 */
	ALREADY_EXISTS = 'ALREADY_EXISTS',
	/**
	 * 419 删除角色失败
	 */
	ROLE_DELETE_ERROR = "ROLE_DELETE_ERROR",
	/**
	 * 419 角色名称已存在
	 */
	ROLE_NAME_EXISTED_ERROR = "ROLE_NAME_EXISTED_ERROR",
	/**
	 * 500 不可恢复的数据丢失或数据损坏。 客户端应该向用户报告错误。
	 */
	DATA_LOSS = 'DATA_LOSS',
	/**
	 * 500 未知的服务器错误。 通常是服务器错误。
	 */
	UNKNOWN = 'UNKNOWN',
	/**
	 * 500 内部服务错误。 通常是服务器错误。
	 */
	INTERNAL = 'INTERNAL',
}