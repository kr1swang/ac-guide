import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFossil } from './CustomIcons.jsx'
import { faBook, faBug, faFish, faDisease, faPalette, faCompactDisc, faGlobeAmericas, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default class MainFilter extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		// add custom icons to fontawesome library
		library.add(faFossil)
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
							<span>
								<Button
									name='type'
									variant="outline-secondary"
									size="sm"
									active={this.props.type == 'bug' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'bug')}
								><FontAwesomeIcon icon={faBug} />{' 蟲類'}</Button>{' '}
								<Button
									name='type'
									variant="outline-secondary"
									size="sm"
									active={this.props.type == 'fish' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'fish')}
								><FontAwesomeIcon icon={faFish} />{' 魚類'}</Button>{' '}
								<Button
									name='type'
									variant="outline-secondary"
									size="sm"
									active={this.props.type == 'seaCreatures' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'seaCreatures')}
								><FontAwesomeIcon icon={faDisease} />{' 海洋生物'}</Button>{' '}
								<Button
									name='type'
									variant="outline-secondary"
									size="sm"
									active={this.props.type == 'fossil' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'fossil')}
								><FontAwesomeIcon icon={faFossil} />{' 化石'}</Button>{' '}
								<Button
									name='type'
									variant="outline-secondary"
									size="sm"
									active={this.props.type == 'art' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'art')}
								><FontAwesomeIcon icon={faPalette} />{' 美術品'}</Button>{' '}
								<Button
									name='type'
									variant="outline-secondary"
									size="sm"
									active={this.props.type == 'song' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'song')}
								><FontAwesomeIcon icon={faCompactDisc} />{' 唱片'}</Button>{' '}
							</span>
						</td>
					</tr>

					{/* 地區 */}
					<tr>
						<th>
							<FontAwesomeIcon icon={faGlobeAmericas} />{' 地區 : '}
						</th>
						<td>
							<span>
								<Button
									name='hemisphere'
									variant="outline-secondary"
									size="sm"
									active={this.props.hemisphere == 'northern' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'northern')}
								><FontAwesomeIcon icon={faChevronUp} />{' 北半球'}</Button>{' '}
							</span>
							<span>
								<Button
									name='hemisphere'
									variant="outline-secondary"
									size="sm"
									active={this.props.hemisphere == 'southern' ? true : false}
									onClick={(e) => this.props.onChangeValue(e.target.name, 'southern')}
								><FontAwesomeIcon icon={faChevronDown} />{' 南半球'}</Button>{' '}
							</span>
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
	onChangeValue: () => { }
}

MainFilter.propTypes = {
	type: PropTypes.string,
	hemisphere: PropTypes.string,
	onChangeValue: PropTypes.func
}