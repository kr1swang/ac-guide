import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import MainFilter from './widgets/MainFilter.jsx'
import BugGuide from './widgets/BugGuide.jsx'
import FishGuide from './widgets/FishGuide.jsx'
import SeaCreaturesGuide from './widgets/SeaCreaturesGuide.jsx'
import FossilGuide from './widgets/FossilGuide.jsx'
import ArtGuide from './widgets/ArtGuide.jsx'
import SongGuide from './widgets/SongGuide.jsx'

class FormMain extends Component {
	constructor(props) {
		super(props)

		this.handleInitMarked = this.handleInitMarked.bind(this)
		this.handleChangeMarked = this.handleChangeMarked.bind(this)
		this.handleInitValue = this.handleInitValue.bind(this)
		this.handleChangeValue = this.handleChangeValue.bind(this)
	}

	componentDidMount() {
		// init marked by localStorage
		this.handleInitMarked()

		// init default option
		this.handleInitValue()
	}

	handleInitMarked() {
		let storage = window.localStorage

		if (storage.getItem('markedLists')) {
			// assign to reduxStore
			this.props.handleAssignFormMain({
				markedLists: JSON.parse(storage.getItem('markedLists'))
			})
		}
	}

	handleChangeMarked(type, id) {
		let storage = window.localStorage

		// creat mirror obj and update value
		let markedLists = JSON.parse(JSON.stringify(this.props.markedLists))

		try {
			markedLists[type].indexOf(id)
		} catch{
			markedLists[type] = []
		}

		let index = markedLists[type].indexOf(id)

		index == -1 ? markedLists[type].push(id) : markedLists[type].splice(index, 1)
		markedLists[type].sort((a, b) => a - b)

		// assign to reduxStore
		this.props.handleAssignFormMain({
			markedLists: markedLists
		})

		// update localStorage (markedLists)
		storage.setItem('markedLists', JSON.stringify(markedLists))
	}

	handleInitValue() {
		let storage = window.localStorage

		let type = this.props.type
		let hemisphere = this.props.hemisphere

		if (storage.getItem('type')) {
			type = storage.getItem('type')
		}

		if (storage.getItem('hemisphere')) {
			hemisphere = storage.getItem('hemisphere')
		}

		this.handleChangeValue('type', type)
		this.handleChangeValue('hemisphere', hemisphere)
	}

	handleChangeValue(name, value) {
		switch (name) {
			case 'type': {
				if (value) {
					let dataLists = JSON.parse(JSON.stringify(this.props.dataLists))
					let storage = window.localStorage
					let dateNow = new Date()

					// check timestamp to clear localStorage (diff more than 2 days(1000 * 60 * 60 * 24 * 2) clear) 
					if (!storage.getItem('timestamp') || ((dateNow.getTime() - parseInt(storage.getItem('timestamp'))) > 1000 * 60 * 60 * 24 * 2)) {
						storage.removeItem(value)
					}

					// try get value by reduxStore (objectArray)
					if (dataLists[value] && dataLists[value].length > 0) {
						// update reduxStore (typeFlag)
						this.props.handleAssignFormMain({
							type: value
						})

						// update localStorage (type)
						storage.setItem('type', value)
					}
					// try get value by localStorage (jsonString)
					else if (storage.getItem(value) && JSON.parse(storage.getItem(value)).length > 0) {
						dataLists[value] = JSON.parse(storage.getItem(value))

						// update reduxStore (typeFlag, dataList)
						this.props.handleAssignFormMain({
							type: value,
							dataLists: dataLists
						})

						// update localStorage (type)
						storage.setItem('type', value)
					}
					// try get value by api (objectArray)
					else {
						this.props.setBlocking(true)

						const args = { type: value }

						apiClient.GetList(args).then((resp) => {
							const result = resp.data
							dataLists[value] = result

							// update reduxStore (typeFlag, dataList)
							this.props.handleAssignFormMain({
								type: value,
								dataLists: dataLists
							})

							// update localStorage (type, dataList, timestamp)
							storage.setItem('type', value)
							storage.setItem(value, JSON.stringify(dataLists[value]))
							storage.setItem('timestamp', dateNow.getTime().toString())
						}).catch((err) => {
							console.log('Fail! ' + err)
							alert('載入失敗😥\n請嘗試重新整理!!')
						}).finally(() => {
							setTimeout(() => this.props.setBlocking(false), 100)
						})
					}
				}

				break
			}
			case 'hemisphere': {
				let storage = window.localStorage

				// update reduxStore (hemisphere)
				this.props.handleAssignValue(name, value)

				// update localStorage (hemisphere)
				storage.setItem('hemisphere', value)

				break
			}
			default: {
				break
			}
		}
	}

	render() {
		let mainFilter = <MainFilter
			type={this.props.type}
			hemisphere={this.props.hemisphere}
			onChangeValue={(name, value) => this.handleChangeValue(name, value)}
		/>

		let defaultView = <Fragment>
			<div className={'accordion'}>{mainFilter}</div>
			<hr />
			<h5>{'Hello!!'}</h5>
			<p>{'歡迎使用 ac-Guide 動森圖鑑, '}</p>
			<p>{'點選上方種類, 及選擇預設地區開始!'}</p>
			<p>{'點擊查詢結果會顯示詳細資料, 並可添加標記~'}</p>
		</Fragment>

		return (
			<div className={'main'}>
				{
					{
						'bug': <BugGuide
							mainFilter={mainFilter}
							hemisphere={this.props.hemisphere}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							onChangeMarked={(type, id) => this.handleChangeMarked(type, id)}
						/>,
						'fish': <FishGuide
							mainFilter={mainFilter}
							hemisphere={this.props.hemisphere}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							onChangeMarked={(type, id) => this.handleChangeMarked(type, id)}
						/>,
						'seaCreatures': <SeaCreaturesGuide
							mainFilter={mainFilter}
							hemisphere={this.props.hemisphere}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							onChangeMarked={(type, id) => this.handleChangeMarked(type, id)}
						/>,
						'fossil': <FossilGuide
							mainFilter={mainFilter}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							onChangeMarked={(type, id) => this.handleChangeMarked(type, id)}
						/>,
						'art': <ArtGuide
							mainFilter={mainFilter}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							onChangeMarked={(type, id) => this.handleChangeMarked(type, id)}
						/>,
						'song': <SongGuide
							mainFilter={mainFilter}
							dataList={this.props.dataLists[this.props.type]}
							markedList={this.props.markedLists[this.props.type]}
							onChangeMarked={(type, id) => this.handleChangeMarked(type, id)}
						/>
					}[this.props.type] || defaultView
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
	handleAssignFormHeader: PropTypes.func,
	handleAssignFormMain: PropTypes.func,
	handleAssignFormFoorter: PropTypes.func,
	handleAssignValue: PropTypes.func
}