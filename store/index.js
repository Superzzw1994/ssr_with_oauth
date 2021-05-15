import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import userReducer from "../pages/user/logic";

// const initStore = () => {
//   const reducers = combineReducers({
//     user: userReducer
//   })
//   return createStore(reducers, applyMiddleware(thunk))
// }
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
  user: userReducer
})
const initStore = (initState) => createStore(reducers, initState, composeEnhancers(applyMiddleware(thunk)))
export default initStore
