import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFish, faBug, faGlobeAmericas, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default class MainFilter extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Table className={'filter'}>
				<tbody>
					{/* 種類 */}
					<tr>
						<th style={{ width: '100px', borderTop: '0px' }}>
							<FontAwesomeIcon icon={faBook} />{' 種類 : '}
						</th>
						<td style={{ borderTop: '0px' }}>
							<Button
								name='type'
								variant="outline-secondary"
								size="sm"
								active={this.props.type == 'fish' ? true : false}
								onClick={() => this.props.onChaneType('fish')}
							><FontAwesomeIcon icon={faFish} />{' 魚類'}</Button>{' '}
							<Button
								name='type'
								variant="outline-secondary"
								size="sm"
								active={this.props.type == 'bug' ? true : false}
								onClick={() => this.props.onChaneType('bug')}
							><FontAwesomeIcon icon={faBug} />{' 蟲類'}</Button>{' '}
						</td>
					</tr>

					{/* 地區 */}
					<tr>
						<th>
							<FontAwesomeIcon icon={faGlobeAmericas} />{' 地區 : '}
						</th>
						<td>
							<Button
								name='hemisphere'
								variant="outline-secondary"
								size="sm"
								active={this.props.hemisphere == 'northern' ? true : false}
								onClick={(e) => this.props.onChaneHemisphere(e.target.name, 'northern')}
							><FontAwesomeIcon icon={faChevronUp} />{' 北半球'}</Button>{' '}
							<Button
								name='hemisphere'
								variant="outline-secondary"
								size="sm"
								active={this.props.hemisphere == 'southern' ? true : false}
								onClick={(e) => this.props.onChaneHemisphere(e.target.name, 'southern')}
							><FontAwesomeIcon icon={faChevronDown} />{' 南半球'}</Button>{' '}
						</td>
					</tr>
				</tbody>
			</Table>
		)
	}
}

MainFilter.defaultProps = {
	type: 'fish',
	hemisphere: 'northern',
	onChaneType: () => { },
	onChaneHemisphere: () => { }
}

MainFilter.propTypes = {
	type: PropTypes.string,
	hemisphere: PropTypes.string,
	onChaneType: PropTypes.func,
	onChaneHemisphere: PropTypes.func
}