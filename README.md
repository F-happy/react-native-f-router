# react-native-f-router
我自己用的 react-router 在 React Native 上的实现

## 安装
```bash
npm install --save react-native-f-router
```

## demo 
```jsx harmony
import FRouter, {IndexRoute, Route, NotFound, NavBar} from 'react-native-f-router';

<FRouter navigationBar={<NavBar/>} config={youConfig} contentContainerStyle={youSytles}>
    <IndexRoute title="首页" params={{tab: 'tab1'}} component={HomePage}/>
    <Route path="index" title="首页" component={HomePage}/>
    <NotFound component={NotFoundPage}/>
</FRouter>
```

```javascript
import {nativeHistory} from 'react-native-f-router';

nativeHistory.resetTo('index', {tab, title});
nativeHistory.replace('loginPage');
nativeHistory.push('userInfoPage');
```

# API

## ```<FRouter/>``` root 路由

这是根节点的路由，在这个元素下的路由才会被注册到路由栈中，如果 path 地址没有在这里注册的话，那么后面将无法通过 nativeHistory 对象进行跳转。

### navigationBar
* Type: NavBar Object

这个属性接受一个 NavBar 对象，目前你可以从包中 import {NavBar} 对象出来，这其实是一个 react-native 中的```Navigator.NavigationBar``` 对象，它接受原生对象中所有的参数和属性。

### config
* Type: NavBarConfig Object

这个属性接受一个 NavBarConfig 对象，目前你可以从包中 import {NavBarConfig} 对象出来，这其实是一个 react-native 中的```Navigator.SceneConfigs```对象，它接受原生对象中所有的参数和属性。

### contentContainerStyle
* Type: Native Style Object

这个属性接受一个原生样式对象，这些样式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内。

## ```<IndexRoute/>``` 首页路由

### title
* Type: string

设置页面的标题

### params
* Type: object

这个参数接受一个对象作为传递给页面的 params 参数

### component
* Type: React Element

这个参数接受一个 react 对象，作为跳转的页面

## ```<Route/>``` 子路由
> 继承 ```<IndexRoute/>``` 组件的全部属性

### path
* Type: string

页面跳转的路径

## ```<NotFound/>``` 404时显示的页面

### component
* Type: React Element

这个参数接受一个 react 对象，作为显示的页面

## nativeHistory

### push(url, params) 跳转到新的场景
* url | Type：string | object（当参数值为一个对象时这个方法将不会接受第二个参数，而变成原生的 push 方法）

这是路由跳转的路径地址，需要在 route 组件中配置，当检测不到时跳转到 NotFound页面

* params | Type：object

这个参数接受一个对象作为传递给页面的 params 参数

### resetTo(url, params) 跳转到新的场景，并且重置整个路由栈
> 参数同 push 方法

### popToRoute(url, params) 跳转到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
> 参数同 push 方法

### replace(url, params) 用一个新的路由替换掉当前场景
> 参数同 push 方法

### pop() 返回上一个页面

### getRoutes() 获取当前路由中的页面
* return: list

