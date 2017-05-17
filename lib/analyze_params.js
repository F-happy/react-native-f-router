/**
 * 解析路由参数，返回标准的 native 参数
 * @returns {*}
 * Created by fuhuixiang on 2017-5-17.
 * @param reactView
 */

export default (reactView) => {
    return (path, params = {}, stack) => {
        if (typeof path === 'object') {
            return path;
        }
        let component = null;
        let title = params['title'];
        let root = path.split('/');
        let route = stack[root[0]];
        if (route) {
            component = route.component;
            title = title ? title : route.title;
            if (route.urlParam && (root.length !== 1)) {
                params[route.urlParam.substring(1)] = root[root.length - 1]
            }
            params = Object.assign({}, route.params, params);
            return {component, title, params}
        } else {
            return {component: reactView}
        }
    };
}
