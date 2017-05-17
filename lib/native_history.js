/**
 * 分装的对外接口
 * @type {{pop: (()), resetTo: ((p1?:*, p2?:*)), popToRoute: ((p1?:*, p2?:*)), replace: ((p1?:*, p2?:*)), push: ((p1?:*, p2?:*)), getRoutes: (())}}
 */

export default (navigatorRoute, analyze, routeStack) => {
    return {
        pop: () => {
            if (navigatorRoute) {
                navigatorRoute.pop();
            }
        },
        resetTo: (path, params) => {
            if (navigatorRoute) {
                navigatorRoute.resetTo(analyze(path, params, routeStack));
            }
        },
        popToRoute: (path, params) => {
            if (navigatorRoute) {
                navigatorRoute.popToRoute(analyze(path, params, routeStack));
            }
        },
        replace: (path, params) => {
            if (navigatorRoute) {
                navigatorRoute.replace(analyze(path, params, routeStack));
            }
        },
        push: (path, params) => {
            if (navigatorRoute) {
                navigatorRoute.push(analyze(path, params, routeStack));
            }
        },
        getRoutes: () => {
            if (navigatorRoute) {
                return navigatorRoute.getCurrentRoutes();
            } else {
                return 0;
            }
        }
    };
};
