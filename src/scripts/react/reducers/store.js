import { createStore, combineReducers } from 'redux'
import formHeader from './formHeaderReducer'
import formMain from './formMainReducer'
import formFooter from './formFooterReducer'

const rootReducer = combineReducers({
    formHeader,
    formMain,
    formFooter
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store