import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Badge, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faStar } from '@fortawesome/free-solid-svg-icons'

export default class CustomCard extends Component {
	constructor(props) {
		super(props)

		this.handelConvertColorCode = this.handelConvertColorCode.bind(this)
	}

	handelConvertColorCode(hemisphere, item) {
		let result = '#E9EBEE'
		let dateNow = new Date()

		let itemMonths = hemisphere == 'northern' ? item.northernMonths : item.southernMonths
		let itemHours = item.appearanceTime

		if (itemMonths.includes(dateNow.getMonth() + 1) && itemHours.includes(dateNow.getHours() == 0 ? 24 : dateNow.getHours())) {
			result = '#42B72A'
		} else {
			result = '#FF0000'
		}

		if (item.chineseName == '') {
			result = '#E9EBEE'
		}

		return result
	}

	render() {
		return (
			<Media onClick={() => this.props.onClick()}>
				{['fish', 'bug'].includes(this.props.type) ?
					<FontAwesomeIcon
						icon={faCircle}
						style={{ position: 'absolute', fontSize: 'x-small', float: 'left', color: this.handelConvertColorCode(this.props.hemisphere, this.props.object) }}
					/>
					: <React.Fragment />
				}
				{this.props.isMarked ?
					<FontAwesomeIcon
						icon={faStar}
						style={{ position: 'absolute', fontSize: 'x-small', float: 'left', marginTop: '20px', color: '#FFC107' }}
					/>
					: <React.Fragment />
				}
				<Image
					style={{ width: '20%', maxWidth: '80px', margin: '5px 20px', backgroundColor: '#FFF8DC' }}
					src={this.props.object.imageUrl}
					roundedCircle={true}
				/>
				<Media.Body>
					<h4>
						<span className={'font-weight-bold'} style={{ verticalAlign: 'middle' }}>{this.props.object.chineseName}</span>{' '}
						<Badge pill variant='secondary'>{'$ ' + this.props.object.price}</Badge>
					</h4>
					<p style={{ marginBottom: '0px' }}>
						{['fish'].includes(this.props.type) ? this.props.object.shadowSize + ' / ' : ''}
						{['fish', 'bug'].includes(this.props.type) ? this.props.object.location : ''}
						{['fossil'].includes(this.props.type) ? this.props.object.series : ''}
						{this.props.object.remark != '' ? <small><br />{'※ ' + this.props.object.remark}</small> : ''}
					</p>
				</Media.Body>
			</Media>
		)
	}
}

CustomCard.defaultProps = {
	type: 'bug',
	hemisphere: 'northern',
	object: {
		imageUrl: '',
		chineseName: '',
		englishName: '',
		price: 0,
		location: '',
		series: '',
		northernMonths: [],
		southernMonths: [],
		appearanceTime: [],
		remark: ''
	},
	onClick: () => { },
	isMarked: false
}

CustomCard.propTypes = {
	type: PropTypes.string,
	hemisphere: PropTypes.string,
	object: PropTypes.object,
	onClick: PropTypes.func,
	isMarked: PropTypes.bool
}