import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import MainFilter from './widgets/MainFilter.jsx'
import FishGuide from './widgets/FishGuide.jsx'
import BugGuide from './widgets/BugGuide.jsx'

class FormMain extends Component {
	constructor(props) {
		super(props)

		this.handleChangeType = this.handleChangeType.bind(this)
		this.handleGetMarked = this.handleGetMarked.bind(this)
		this.handleSetMarked = this.handleSetMarked.bind(this)
	}

	componentDidMount() {
		// init marked by localStorage
		this.handleGetMarked()

		// init default option
		this.handleChangeType(this.props.type)
	}

	handleChangeType(type) {
		let dataLists = JSON.parse(JSON.stringify(this.props.dataLists))
		let storage = window.localStorage
		let dateNow = new Date()

		// check timestamp to clear localStorage (diff more than 2 hour(1000 * 60 * 60 * 2) clear) 
		if (!storage.getItem('timestamp') || ((dateNow.getTime() - parseInt(storage.getItem('timestamp'))) > 1000 * 60 * 60 * 2)) {
			storage.removeItem(type)
		}

		// try get value by reduxStore (objectArray)
		if (dataLists[type].length > 0) {
			// update reduxStore (typeFlag)
			this.props.handleAssignFormMain({
				type: type
			})
		}
		// try get value by localStorage (jsonString)
		else if (storage.getItem(type) && JSON.parse(storage.getItem(type)).length > 0) {
			dataLists[type] = JSON.parse(storage.getItem(type))

			// update reduxStore (typeFlag, dataList)
			this.props.handleAssignFormMain({
				type: type,
				dataLists: dataLists
			})
		}
		// try get value by api (objectArray)
		else {
			this.props.setBlocking(true)

			const args = { type: type }

			apiClient.GetList(args).then((resp) => {
				const result = resp.data
				dataLists[type] = result

				// update reduxStore (typeFlag, dataList)
				this.props.handleAssignFormMain({
					type: type,
					dataLists: dataLists
				})

				// update localStorage (dataList, timestamp)
				storage.setItem(type, JSON.stringify(dataLists[type]))
				storage.setItem('timestamp', dateNow.getTime().toString())
			}).catch((err) => {
				console.log('Fail! ' + err)
				alert('載入失敗😥\n請嘗試重新整理!!')
			}).finally(() => {
				setTimeout(() => this.props.setBlocking(false), 100)
			})
		}
	}

	handleGetMarked() {
		let storage = window.localStorage

		if (storage.getItem('markedLists')) {
			// assign to reduxStore
			this.props.handleAssignFormMain({
				markedLists: JSON.parse(storage.getItem('markedLists'))
			})
		}
	}

	handleSetMarked(type, id) {
		let storage = window.localStorage

		// creat mirror obj and update value
		let markedLists = JSON.parse(JSON.stringify(this.props.markedLists))
		let index = markedLists[type].indexOf(id)

		index == -1 ? markedLists[type].push(id) : markedLists[type].splice(index, 1)

		// assign to reduxStore
		this.props.handleAssignFormMain({
			markedLists: markedLists
		})

		// update localStorage (markedLists)
		storage.setItem('markedLists', JSON.stringify(markedLists))
	}

	render() {
		let mainFilter = <MainFilter
			type={this.props.type}
			hemisphere={this.props.hemisphere}
			onChaneType={(type) => this.handleChangeType(type)}
			onChaneHemisphere={(name, value) => this.props.handleAssignValue(name, value)}
		/>

		return (
			<div className={'main'}>
				{
					{
						'fish': <FishGuide
							mainFilter={mainFilter}
							hemisphere={this.props.hemisphere}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							handleSetMarked={(type, id) => this.handleSetMarked(type, id)}
						/>,
						'bug': <BugGuide
							mainFilter={mainFilter}
							hemisphere={this.props.hemisphere}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							handleSetMarked={(type, id) => this.handleSetMarked(type, id)}
						/>
					}[this.props.type] || <div className={'accordion'}>{mainFilter}</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	ownProps: ownProps,		// for eslint
	type: state.formMain.type,
	hemisphere: state.formMain.hemisphere,
	dataLists: state.formMain.dataLists,
	markedLists: state.formMain.markedLists
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	ownProps: ownProps,		// for eslint
	setBlocking: (flag) => {
		dispatch(actions.setBlocking(flag))
	},
	handleAssignFormMain: (formMain) => {
		dispatch(actions.assignFormDataMain({ formMain: formMain }))
	},
	handleAssignValue: (name, value) => {
		dispatch(actions.assignValue(name, value, 'formMainReducer'))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormMain)

FormMain.propTypes = {
	type: PropTypes.string,
	hemisphere: PropTypes.string,
	dataLists: PropTypes.object,
	markedLists: PropTypes.object,

	setBlocking: PropTypes.func,
	handleAssignFormMain: PropTypes.func,
	handleAssignValue: PropTypes.func
}