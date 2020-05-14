import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from './actions.jsx'

class FormFooter extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={'footer'}>
				<p>{this.props.msg}</p>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	ownProps: ownProps,		// for eslint
	msg: state.formFooter.msg
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
		dispatch(actions.assignValue(name, value, 'formFooterReducer'))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormFooter)

FormFooter.propTypes = {
	msg: PropTypes.string
}