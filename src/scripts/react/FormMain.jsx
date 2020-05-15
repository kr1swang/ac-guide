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

		this.ajaxGetList = this.ajaxGetList.bind(this)
	}

	componentDidMount() {
		this.ajaxGetList(this.props.type)
	}

	ajaxGetList(type) {
		if (this.props.dataLists[type].length == 0) {
			// if dataList is empty, do call api
			this.props.setBlocking(true)

			const args = { type: type }

			apiClient.GetList(args).then((resp) => {
				const result = resp.data
				let dataLists = JSON.parse(JSON.stringify(this.props.dataLists))
				dataLists[type] = result

				this.props.handleAssignFormMain({
					type: type,
					dataLists: dataLists
				})
			}).catch((err) => {
				console.log('Fail! ' + err)
				alert('載入失敗😥\n請嘗試重新整理!!')
			}).finally(() => {
				setTimeout(() => this.props.setBlocking(false), 100)
			})
		} else {
			// already get dataList, do change flag
			this.props.handleAssignFormMain({
				type: type
			})
		}
	}

	render() {
		let mainFilter = <MainFilter
			type={this.props.type}
			hemisphere={this.props.hemisphere}
			onChaneType={(type) => this.ajaxGetList(type)}
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