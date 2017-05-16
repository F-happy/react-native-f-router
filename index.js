/**
 * react-native 上的 react-router 实现
 * Created by fuhuixiang on 2017-5-15.
 */
import React, {Component} from 'react';
import {StyleSheet, Navigator, View, Text} from 'react-native';

// 默认的 404 页面
let NotFoundPage = () => {
    return (
        <View style={StyleSheet.create({
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        })}>
            <Text>not found pages</Text>
        </View>
    );
};
let navigatorRoute = null; // 全局 navigator 对象
let routeStack = {};       // 路由栈

/**
 * 主路由渲染
 */
export default class FRouter extends Component {
    constructor(props) {
        super(props);
        const {navigationBar, config, children} = this.props;
        React.Children.forEach(children, (child) => {
            const {props, type} = child;
            if (type.name === 'IndexRoute') {
                routeStack['index'] = {
                    component: props.component,
                    params: props.params,
                    title: props.title
                };
            }
            if (type.name === 'NotFound') {
                NotFoundPage = props.component;
            }
        });
        registerRoute(children);
        this.config = config;
        this.navigationBar = navigationBar;
    }

    render() {
        return (
            <View style={this.props.contentContainerStyle}>
                <Navigator
                    ref={ref => navigatorRoute = ref}
                    initialRoute={routeStack['index']}
                    renderScene={
                        (route) => {
                            return <route.component route={route} params={route.params}/>;
                        }}
                    configureScene={this.config}
                    navigationBar={this.navigationBar}
                />
            </View>
        );
    }
}

/**
 * 注册路由到路由栈中
 * @param children
 */
function registerRoute(children) {
    React.Children.forEach(children, (child) => {
        const {type, props} = child;
        if (type.name === 'Route') {
            const {path, component, title, params} = props;
            let name = path.split('/');
            if (!routeStack[name[0]]) {
                let urlParam = null;
                if (/^:/.test(name[name.length - 1])) {
                    urlParam = name[name.length - 1];
                }
                routeStack[name[0]] = {title, component, params, urlParam};
            }
        }
    });
}

/**
 * 解析路由参数，返回标准的 native 参数
 * @param path
 * @param params
 * @param stack
 * @returns {*}
 */
function analyzeParams(path, params = {}, stack) {
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
        return {component: NotFoundPage}
    }
}

/**
 * 配置首页
 * @param props
 * @returns {IndexRoute.props}
 * @constructor
 */
export const IndexRoute = (props) => {
    return props;
};

/**
 * 配置路由页面
 * @param props
 * @returns {Route.props}
 * @constructor
 */
export const Route = (props) => {
    return props;
};

/**
 * 配置 404 页面
 * @param props
 * @returns {NotFound.props}
 * @constructor
 */
export const NotFound = (props) => {
    return props;
};

/**
 * 分装的对外接口
 * @type {{pop: (()), resetTo: ((p1?:*, p2?:*)), popToRoute: ((p1?:*, p2?:*)), replace: ((p1?:*, p2?:*)), push: ((p1?:*, p2?:*)), getRoutes: (())}}
 */
export const nativeHistory = {
    pop: () => {
        if (navigatorRoute) {
            navigatorRoute.pop();
        }
    },
    resetTo: (path, params) => {
        if (navigatorRoute) {
            navigatorRoute.resetTo(analyzeParams(path, params, routeStack));
        }
    },
    popToRoute: (path, params) => {
        if (navigatorRoute) {
            navigatorRoute.popToRoute(analyzeParams(path, params, routeStack));
        }
    },
    replace: (path, params) => {
        if (navigatorRoute) {
            navigatorRoute.replace(analyzeParams(path, params, routeStack));
        }
    },
    push: (path, params) => {
        if (navigatorRoute) {
            navigatorRoute.push(analyzeParams(path, params, routeStack));
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

export const NavBar = Navigator.NavigationBar;          // 暴露出原生 NavBar
export const NavBarConfig = Navigator.SceneConfigs;     // 暴露出原生 navigator 配置属性
