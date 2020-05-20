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
				<a
					href={this.props.githubUrl}
					target={'_blank'}
					rel={'noreferrer'}
				>{this.props.msg}</a>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	ownProps: ownProps,		// for eslint
	msg: state.formFooter.msg,
	githubUrl: state.formFooter.githubUrl
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	ownProps: ownProps,		// for eslint
	setBlocking: (flag) => {
		dispatch(actions.setBlocking(flag))
	},
	handleAssignFormHeader: (formHeader) => {
		dispatch(actions.assignFormDataHeader({ formHeader: formHeader }))
	},
	handleAssignFormMain: (formMain) => {
		dispatch(actions.assignFormDataMain({ formMain: formMain }))
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
	msg: PropTypes.string,
	githubUrl: PropTypes.string,

	setBlocking: PropTypes.func,
	handleAssignFormHeader: PropTypes.func,
	handleAssignFormMain: PropTypes.func,
	handleAssignFormFoorter: PropTypes.func,
	handleAssignValue: PropTypes.func
}