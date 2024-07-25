import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reactotron from '../ReactotronConfig'
import thunk from 'redux-thunk'

//import reducers


// const appReducer = combineReducers({
    
    
// })

// const reducer = (state, action) => {
//     if (action.type === RESET_USER) {
//         return appReducer(undefined, action)
//     }

//     return appReducer(state, action)
// }

const middleware = [ thunk ];

if (__DEV__) { // Check if it's development mode
    const reactotronMiddleware = reactotron.createEnhancer();
    // Creating Reactotron "data capturer"
    middleware.push(reactotronMiddleware);
    // And pushing it to the middlewares array
  }


const store = createStore(compose(applyMiddleware(...middleware)));

export default store; 