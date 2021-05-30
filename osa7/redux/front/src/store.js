import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notification'
import loginReducer from './reducers/login'
import blogReducer from './reducers/blogs'
 
const reducer = combineReducers({
  notification: notificationReducer,
  user: loginReducer,
  blogs: blogReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
