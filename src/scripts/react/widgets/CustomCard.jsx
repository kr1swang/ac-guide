import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Badge, Image } from 'react-bootstrap'

export default class CustomCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Media onClick={() => this.props.onClick()}>
				<Image
					style={{ width: '20%', maxWidth: '80px', margin: '5px 20px', backgroundColor: '#FFF8DC' }}
					src={this.props.object.imageURL}
					roundedCircle={true}
				/>
				<Media.Body>
					<h4>
						<span className={'font-weight-bold'} style={{ verticalAlign: 'middle' }}>{this.props.object.chineseName}</span>{' '}
						<Badge pill variant='secondary'>{'$ ' + this.props.object.price}</Badge>
					</h4>
					<p style={{ marginBottom: '0px' }}>
						{this.props.type == 'fish' ? this.props.object.shadowSize + ' / ' : ''}
						{this.props.object.location}
						{this.props.object.remark != '' ? <small><br />{'※ ' + this.props.object.remark}</small> : ''}
					</p>
				</Media.Body>
			</Media>
		)
	}
}

CustomCard.defaultProps = {
	type: 'bug',
	onClick: () => { },
	object: {
		imageURL: '',
		chineseName: '',
		englishName: '',
		price: 0,
		location: '',
		northernMonths: [],
		southernMonths: [],
		appearanceTime: [],
		remark: ''
	}
}

CustomCard.propTypes = {
	type: PropTypes.string,
	onClick: PropTypes.func,
	object: PropTypes.object
}