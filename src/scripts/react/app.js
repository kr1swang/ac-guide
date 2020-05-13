import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import store from './reducers/store'
import FormHeader from './FormHeader'
import FormMain from './FormMain'
import FormFooter from './FormFooter'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <div className={'main'}>
                    <FormHeader/>
                    <hr />
                    <FormMain />
                    <hr />
                    <FormFooter />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)