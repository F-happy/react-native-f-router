/**
 * react-native 上的 react-router 实现
 * Created by fuhuixiang on 2017-5-15.
 */
import React, {Component} from 'react';
import {Navigator, View} from 'react-native';
import NotFoundPage from './lib/not_found_page';
import RouteFactory from './lib/route';
import NotFoundFactory from './lib/not_found';
import IndexRouteFactory from './lib/index_routes';
import registerRoute from './lib/register_route';
import nativeHistoryFactory from './lib/native_history';
import analyzeParamsFactory from './lib/analyze_params';

let navigatorRoute = null; // 全局 navigator 对象
let routeStack = {};       // 路由栈
let analyzeParams = analyzeParamsFactory(NotFoundPage);

/**
 * 分装的对外接口
 */
export let nativeHistory = null;

export const NavBar = Navigator.NavigationBar;          // 暴露出原生 NavBar
export const NavBarConfig = Navigator.SceneConfigs;     // 暴露出原生 navigator 配置属性

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
                analyzeParams = analyzeParamsFactory(props.component);
            }
        });
        routeStack = registerRoute(children, routeStack);
        this.config = config;
        this.navigationBar = navigationBar;
    }

    componentDidMount() {
        nativeHistory = nativeHistoryFactory(navigatorRoute, analyzeParams, routeStack);
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

export const IndexRoute = (props) => {
    return IndexRouteFactory(props);
};

export const Route = (props) => {
    return RouteFactory(props);
};

export const NotFound = (props) => {
    return NotFoundFactory(props);
};
