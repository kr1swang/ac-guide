import React, { Component, lazy, Suspense, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import store from './reducers/store.jsx'

const FormHeader = lazy(() => import('./FormHeader.jsx'))
const FormMain = lazy(() => import('./FormMain.jsx'))
const FormFooter = lazy(() => import('./FormFooter.jsx'))

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Suspense fallback={<Fragment />}>
				<Provider store={store}>
					<Container>
						<FormHeader />
						<hr />
						<FormMain />
						<hr />
						<FormFooter />
					</Container>
				</Provider>
			</Suspense>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)