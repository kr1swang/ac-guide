import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HSBar from 'react-horizontal-stacked-bar-chart'

export default class TimeBar extends Component {
	constructor(props) {
		super(props)

		this.handleConverter = this.handleConverter.bind(this)
	}

	handleConverter(type, data) {
		let result = []
		const maxMonth = 12
		const maxHour = 24

		switch (type) {
			case 'month': {
				for (let i = 1; i < maxMonth + 1; i++) {
					let obj = {
						value: 100,  // size, all the same
						description: i % 3 == 0 ? ('0' + i).slice(-2) : ' ',
						color: data.indexOf(i) != -1 ? '#007bff' : '#e9ecef'  // exist ? blue : gary
					}
					result.push(obj)
				}
				break
			}
			case 'hour': {
				for (let i = 1; i < maxHour + 1; i++) {
					let obj = {
						value: 100,  // size, all the same
						description: i % 6 == 0 ? ('0' + i).slice(-2) : ' ',
						color: data.indexOf(i) != -1 ? '#007bff' : '#e9ecef' // exist ? blue : gary
					}
					result.push(obj)
				}
				break
			}
			default: {
				break
			}
		}

		return result
	}

	render() {
		return (
			<div className={'timeBar'}>
				<HSBar
					data={this.handleConverter(this.props.type, this.props.data)}
					height={12}
					showTextUp={true}
					fontColor='#282c34'
					outlineWidth={0.5}
				/>
			</div>
		)
	}
}

TimeBar.defaultProps = {
	type: 'month',
	data: []
}

TimeBar.propTypes = {
	type: PropTypes.string,
	data: PropTypes.array
}