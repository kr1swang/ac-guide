import { createStore, combineReducers } from 'redux'
import formHeader from './formHeaderReducer.jsx'
import formMain from './formMainReducer.jsx'
import formFooter from './formFooterReducer.jsx'

const rootReducer = combineReducers({
    formHeader,
    formMain,
    formFooter
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store