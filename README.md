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
nativeHistory.push('userInfoPage')
```
