export const ROOT = process.env.LOCAL_SERVER ? "" : "";

export const URLS = {
	HOME: ROOT + "/",
	LOGIN: ROOT + '/login',
	ERROR: ROOT + '/error',
	NOT_FOUND: ROOT + '/error/404',
	UNAUTHORIZED: ROOT + '/error/401',
	EXCEPTION: ROOT + '/home/exception',
	NOT_PERMISSION_EXCEPTION: ROOT + '/home/exception/no_permission',
	NO_SERVICE_EXCEPTION: ROOT + '/home/exception/no_service',
}