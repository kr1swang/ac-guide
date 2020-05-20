import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import UIBlocker from 'react-ui-blocker'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import actions from './actions.jsx'
import SettingDialog from './widgets/SettingDialog.jsx'

class FormHeader extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isDialogShow: false
		}

		this.handleCleanCacheData = this.handleCleanCacheData.bind(this)
		this.handleCleanMarked = this.handleCleanMarked.bind(this)
	}

	componentDidMount() {
		// set web title
		document.title = this.props.htmlTitle

		// init google analytics
		ReactGA.initialize(this.props.trackingID)
		ReactGA.pageview('/')
	}

	handleCleanCacheData() {
		let storage = window.localStorage
		const type = ['fish', 'bug', 'fossil', 'art', 'song']
		const emptyDataLists = { fish: [], bug: [], fossil: [], art: [], song: [] }

		type.forEach(x => {
			if (storage.getItem(x)) {
				storage.removeItem(x)
			}
		})

		this.props.handleAssignFormMain({
			type: '',
			dataLists: emptyDataLists
		})
	}

	handleCleanMarked() {
		let storage = window.localStorage
		const emptyMarkedLists = { fish: [], bug: [], fossil: [], art: [], song: [] }

		storage.setItem('markedLists', JSON.stringify(emptyMarkedLists))

		this.props.handleAssignFormMain({
			markedLists: emptyMarkedLists
		})
	}

	render() {
		return (
			<div className={'header'}>
				<UIBlocker
					theme="cubeGrid"
					isVisible={this.props.isBlocking}
					message="Loading..."
				/>

				<SettingDialog
					isDialogShow={this.state.isDialogShow}
					onHide={() => this.setState({ isDialogShow: false })}
					onCleanCacheData={() => this.handleCleanCacheData()}
					onCleanMarked={() => this.handleCleanMarked()}
				/>

				<h3>
					<FontAwesomeIcon icon={faMobileAlt} />{' '}
					{this.props.htmlTitle}
					<Button
						variant='outline-secondary'
						size='sm'
						style={{ float: 'right' }}
						onClick={() => this.setState({ isDialogShow: true })}
					><FontAwesomeIcon icon={faCog} /></Button>
				</h3>
			</div >
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

	setBlocking: PropTypes.func,
	handleAssignFormHeader: PropTypes.func,
	handleAssignFormMain: PropTypes.func,
	handleAssignFormFoorter: PropTypes.func,
	handleAssignValue: PropTypes.func
}