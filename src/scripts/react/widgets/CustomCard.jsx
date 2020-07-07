import React, { Component, Fragment } from 'react'
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
			<Media onClick={() => this.props.onClick()} style={{ minHeight: '98px' }}>
				{['bug', 'fish', 'seaCreatures'].includes(this.props.type) ?
					<FontAwesomeIcon
						icon={faCircle}
						style={{ position: 'absolute', fontSize: 'x-small', float: 'left', color: this.handelConvertColorCode(this.props.hemisphere, this.props.object) }}
					/>
					: <Fragment />
				}
				{['bug', 'fish', 'seaCreatures'].includes(this.props.type) && this.props.isMarked ?
					<FontAwesomeIcon
						icon={faStar}
						style={{ position: 'absolute', fontSize: 'x-small', float: 'left', marginTop: '20px', color: '#FFC107' }}
					/>
					: <Fragment />
				}
				{['fossil', 'art', 'song'].includes(this.props.type) && this.props.isMarked ?
					<FontAwesomeIcon
						icon={faStar}
						style={{ position: 'absolute', fontSize: 'x-small', float: 'left', color: '#FFC107' }}
					/>
					: <Fragment />
				}
				{['bug', 'fish', 'seaCreatures', 'fossil', 'song'].includes(this.props.type) ?
					<Image
						style={{ width: '20%', maxWidth: '80px', margin: 'auto 20px', backgroundColor: '#FFF8DC' }}
						src={this.props.object.imageUrl}
						roundedCircle={true}
						loading='lazy'
					/>
					: <Fragment />
				}
				{['art'].includes(this.props.type) ?
					<Image
						style={{ width: '20%', maxWidth: '80px', margin: 'auto 20px', backgroundColor: '#FFF8DC', verticalAlign: 'middle' }}
						src={this.props.object.imageUrl}
						loading='lazy'
					/>
					: <Fragment />
				}
				<Media.Body>
					<h4>
						{['bug', 'fish', 'seaCreatures', 'fossil', 'art', 'song'].includes(this.props.type) ?
							<span className={'font-weight-bold'} style={{ verticalAlign: 'middle' }}>{this.props.object.chineseName + ' '}</span>
							: <Fragment />
						}
						{['bug', 'fish', 'seaCreatures', 'fossil'].includes(this.props.type) ?
							<Badge pill variant='secondary'>{'$ ' + this.props.object.price}</Badge>
							: <Fragment />
						}
					</h4>
					<p style={{ marginBottom: '0px' }}>
						{['fish', 'seaCreatures'].includes(this.props.type) ? this.props.object.shadowSize + ' / ' : ''}
						{['art'].includes(this.props.type) ? (this.props.object.imageUrlForgery ? '有贗品 / ' : '無贗品 / ') : ''}
						{['bug', 'fish'].includes(this.props.type) ? this.props.object.location : ''}
						{['seaCreatures'].includes(this.props.type) ? this.props.object.speed : ''}
						{['fossil', 'art'].includes(this.props.type) ? this.props.object.series : ''}
						{['bug', 'fish', 'seaCreatures', 'fossil'].includes(this.props.type) && this.props.object.remark != '' ? <small><br />{'※ ' + this.props.object.remark}</small> : ''}
						{['song'].includes(this.props.type) ? this.props.object.remark : ''}
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
		imageUrlForgery: '',
		chineseName: '',
		englishName: '',
		price: '',
		location: '',
		series: '',
		shadowSize: '',
		speed: '',
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