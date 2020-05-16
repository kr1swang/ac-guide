import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import MainFilter from './widgets/MainFilter.jsx'
import FishGuide from './widgets/FishGuide.jsx'
import BugGuide from './widgets/BugGuide.jsx'

class FormMain extends Component {
	constructor(props) {
		super(props)

		this.handleChangeType = this.handleChangeType.bind(this)
	}

	componentDidMount() {
		this.handleChangeType(this.props.type)
	}

	handleChangeType(type) {
		// step 0. compare cookie timestamp to clear localStorage
		// step 1. try get value (reduxStore > localStorage > api)
		// step 2. update typeFlag value (reduxStore)
		// step 3. update dataList value (reduxStore, localStorage)
		// step 4. update timestamp value (cookie)

		let dataLists = JSON.parse(JSON.stringify(this.props.dataLists))
		let storage = window.localStorage
		let cookies = new Cookies(document.cookie)
		let dateNow = new Date()

		// compare timestamp to clear localStorage (diff more than 2 hour clear) 
		if (!cookies.get('timestamp') || ((dateNow.getTime() - parseInt(cookies.get('timestamp'))) > 1000 * 60 * 60 * 2)) {
			storage.clear()
			console.log('storage is clear', Math.floor((dateNow.getTime() - parseInt(cookies.get('timestamp'))) / 1000))
		} else {
			console.log('storage not clear', Math.floor((dateNow.getTime() - parseInt(cookies.get('timestamp'))) / 1000))
		}

		// try get value by reduxStore (objectArray)
		if (dataLists[type].length > 0) {
			// update reduxStore (typeFlag)
			this.props.handleAssignFormMain({
				type: type
			})

			console.log('by reduxStore')
		}
		// try get value by localStorage (jsonString)
		else if (storage[type] && storage[type].length > 0) {
			dataLists[type] = JSON.parse(storage[type])

			// update reduxStore (typeFlag, dataList)
			this.props.handleAssignFormMain({
				type: type,
				dataLists: dataLists
			})

			console.log('by localStorage')
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

				// update localStorage (dataList)
				storage.setItem(type, JSON.stringify(result))

				// update cookie (timestamp)
				cookies.set('timestamp', dateNow.getTime().toString(), { expires: new Date(dateNow.setDate(dateNow.getDate() + 7)), sameSite: 'none' })

				console.log('by api')
			}).catch((err) => {
				console.log('Fail! ' + err)
				alert('載入失敗😥\n請嘗試重新整理!!')
			}).finally(() => {
				setTimeout(() => this.props.setBlocking(false), 100)
			})
		}
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
							dataList={this.props.dataLists[this.props.type]}
							hemisphere={this.props.hemisphere}
						/>,
						'bug': <BugGuide
							mainFilter={mainFilter}
							dataList={this.props.dataLists[this.props.type]}
							hemisphere={this.props.hemisphere}
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

	setBlocking: PropTypes.func,
	handleAssignFormMain: PropTypes.func,
	handleAssignValue: PropTypes.func
}