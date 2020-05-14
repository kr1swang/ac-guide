import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import UIBlocker from 'react-ui-blocker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import actions from './actions.jsx'

class FormHeader extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// set web title
		document.title = this.props.htmlTitle

		// init google analytics
		ReactGA.initialize(this.props.trackingID)
		ReactGA.pageview('/')
	}

	render() {
		return (
			<div className={'header'}>
				<UIBlocker
					theme="cubeGrid"
					isVisible={this.props.isBlocking}
					message="Loading..."
				/>
				<h3>
					<FontAwesomeIcon icon={faMobileAlt} />{' '}
					{this.props.htmlTitle}
				</h3>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	ownProps: ownProps,		// for eslint
	isBlocking: state.formHeader.isBlocking,
	htmlTitle: state.formHeader.htmlTitle,
	trackingID: state.formHeader.trackingID
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	ownProps: ownProps,		// for eslint
	setBlocking: (flag) => {
		dispatch(actions.setBlocking(flag))
	},
	handleAssignFormHeader: (FormHeader) => {
		dispatch(actions.assignFormDataHeader({ FormHeader: FormHeader }))
	},
	handleAssignFormMain: (FormMain) => {
		dispatch(actions.assignFormDataMain({ FormMain: FormMain }))
	},
	handleAssignFormFoorter: (formFooter) => {
		dispatch(actions.assignFormDataFooter({ formFooter: formFooter }))
	},
	handleAssignValue: (name, value) => {
		dispatch(actions.assignValue(name, value, 'FormHeaderReducer'))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormHeader)

FormHeader.propTypes = {
	isBlocking: PropTypes.bool,
	htmlTitle: PropTypes.string,
	trackingID: PropTypes.string,
}