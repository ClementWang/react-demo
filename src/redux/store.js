import { createStore, combineReducers } from "redux";
import { createBrowserHistory } from 'history';
import { routerReducer } from 'react-router-redux';  // 使用redux管理router所用到的reducer
import rootReducer from "./reducers";

const reducer = combineReducers({
  rootReducer: rootReducer,
  router: routerReducer
})

export default createStore(reducer);

export const history = createBrowserHistory();  // createHistory({ basename: '/spa' });这样可以设置basename
