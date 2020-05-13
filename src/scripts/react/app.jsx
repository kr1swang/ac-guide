import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import store from './reducers/store.jsx'
import FormHeader from './FormHeader.jsx'
import FormMain from './FormMain.jsx'
import FormFooter from './FormFooter.jsx'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <Container>
                    <FormHeader/>
                    <hr />
                    <FormMain />
                    <hr />
                    <FormFooter />
                </Container>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)