import homeReducer from './reducer/homeReducer'
// import authReducer from './reducers/authReducer'
import cardReducer from './reducer/cardReducer'
// import orderReducer from './reducers/orderReducer'
// import dashboardReducer from './reducers/dashboardReducer'
// import chatReducer from './reducers/chatReducer'
const rootReducers = {
    home: homeReducer,
    // auth: authReducer,
    card: cardReducer,
    // order : orderReducer,
    // dashboard : dashboardReducer,
    // chat : chatReducer
}
export default rootReducers