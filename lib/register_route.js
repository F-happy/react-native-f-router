/**
 * 注册路由到路由栈中
 * @param children
 * Created by fuhuixiang on 2017-5-17.
 */
import React from 'react';

export default (children, routeStack) => {
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
    return routeStack;
}
