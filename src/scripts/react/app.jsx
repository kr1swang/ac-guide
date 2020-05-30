import React, { Component, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import store from './reducers/store.jsx'
import UIBlocker from 'react-ui-blocker'

const FormHeader = lazy(() => import('./FormHeader.jsx'))
const FormMain = lazy(() => import('./FormMain.jsx'))
const FormFooter = lazy(() => import('./FormFooter.jsx'))

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Provider store={store}>
				<Container>
					<Suspense fallback={<UIBlocker theme="cubeGrid" isVisible={true} message="Loading..."/>}>
						<FormHeader />
						<hr />
						<FormMain />
						<hr />
						<FormFooter />
					</Suspense>
				</Container>
			</Provider>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)