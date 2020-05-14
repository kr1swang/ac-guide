import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faFont, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import CustomDialog from './CustomDialog.jsx'
import CustomCard from './CustomCard.jsx'

export default class BugGuide extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// control dialog show
			isCollapseShow: false,
			isDialogShow: false,
			activeItem: {
				imageURL: '',
				chineseName: '',
				englishName: '',
				price: 0,
				location: '',
				northernMonths: [],
				southernMonths: [],
				appearanceTime: [],
				remark: ''
			},
			emptyItem: {
				imageURL: '',
				chineseName: '',
				englishName: '',
				price: 0,
				location: '',
				northernMonths: [],
				southernMonths: [],
				appearanceTime: [],
				remark: ''
			},

			// options
			locationOptions: [],
			monthOptions: [],
			hourOptions: [],

			// picked options
			isNoneFilter: false,
			isTimeFilter: false,
			filterName: '',
			locationPicked: [],
			monthPicked: [],
			hourPicked: []
		}

		this.handleFilterClick = this.handleFilterClick.bind(this)
		this.handleConvertFilter = this.handleConvertFilter.bind(this)
	}

	componentDidMount() {
		const locationOptions = ['草地', '花朵', '樹幹', '樹樁', '石頭', '水邊', '水面', '沙灘', '腐爛大頭菜', '居民身上', '雪球', '燈光', '隨機出現']
		const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
		const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

		this.setState({
			locationOptions: locationOptions,
			monthOptions: monthOptions,
			hourOptions: hourOptions
		})

		this.handleFilterClick('isTimeFilter', true)
	}

	handleFilterClick(name, value) {
		switch (name) {
		case 'isNoneFilter': {
			this.setState({
				isNoneFilter: true,
				isTimeFilter: false,
				filterName: '',
				locationPicked: [],
				monthPicked: [],
				hourPicked: []
			})
			break
		}
		case 'isTimeFilter': {
			let dateNow = new Date()

			this.setState({
				isNoneFilter: false,
				isTimeFilter: true,
				filterName: this.state.filterName,
				locationPicked: this.state.locationPicked,
				monthPicked: [dateNow.getMonth() + 1],
				hourPicked: [dateNow.getHours()]
			})
			break
		}
		case 'filterName': {
			let filterName = value

			this.setState({
				isNoneFilter: false,
				filterName: filterName
			})
			break
		}
		case 'locationPicked': {
			let locationPicked = JSON.parse(JSON.stringify(this.state.locationPicked))
			let index = locationPicked.indexOf(value)

			index == -1 ? locationPicked.push(value) : locationPicked.splice(index, 1)

			this.setState({
				isNoneFilter: false,
				locationPicked: locationPicked
			})
			break
		}
		case 'monthOptions': {
			let monthPicked = JSON.parse(JSON.stringify(this.state.monthPicked))
			let index = monthPicked.indexOf(value)

			index == -1 ? monthPicked.push(value) : monthPicked.splice(index, 1)

			let dateNow = new Date()
			let isMonthNowExitst = monthPicked.includes(dateNow.getMonth() + 1)

			this.setState({
				isNoneFilter: false,
				isTimeFilter: isMonthNowExitst ? this.state.isTimeFilter : false,
				monthPicked: monthPicked
			})
			break
		}
		case 'hourOptions': {
			let hourPicked = JSON.parse(JSON.stringify(this.state.hourPicked))
			let index = hourPicked.indexOf(value)

			index == -1 ? hourPicked.push(value) : hourPicked.splice(index, 1)

			let dateNow = new Date()
			let isHourNowExitst = hourPicked.includes(dateNow.getHours() + 1)

			this.setState({
				isNoneFilter: false,
				isTimeFilter: isHourNowExitst ? this.state.isTimeFilter : false,
				hourPicked: hourPicked
			})
			break
		}
		default: {
			break
		}
		}
	}

	handleConvertFilter(oriList) {
		let result = oriList

		// name (chineseName / englishName)
		if (this.state.filterName.length > 0) {
			result = result.filter(x => x.chineseName.indexOf(this.state.filterName) != -1 || x.englishName.indexOf(this.state.filterName) != -1)
		}

		// location
		if (this.state.locationPicked.length > 0) {
			result = result.filter(x => this.state.locationPicked.some(y => y.includes(x.location)))
		}

		// month
		if (this.state.monthPicked.length > 0) {
			// hemisphere
			if (this.props.hemisphere == 'northern') {
				result = result.filter(x => x.northernMonths.some(y => this.state.monthPicked.includes(y)))
			} else {
				result = result.filter(x => x.southernMonths.some(y => this.state.monthPicked.includes(y)))
			}
		}

		// hour
		if (this.state.hourPicked.length > 0) {
			result = result.filter(x => x.appearanceTime.some(y => this.state.hourPicked.includes(y)))
		}

		return result
	}

	render() {
		// get filter list
		let targetList = this.handleConvertFilter(this.props.dataList)

		return (
			<div>
				<CustomDialog
					type={'bug'}
					isDialogShow={this.state.isDialogShow}
					onHide={() => this.setState({ isDialogShow: false, activeItem: this.state.emptyItem })}
					activeItem={this.state.activeItem}
				/>

				{this.props.dataList.length == 0 ? '' :
					<div>
						<span className={'filterGroup'}>
							<Accordion>
								<Table className={'filter'}>
									<tbody>
										{/* 快速 */}
										<tr>
											<th style={{ width: '100px' }}>
											</th>
											<td>
												<Button
													name='isNoneFilter'
													variant='outline-secondary'
													size='sm'
													active={this.state.isNoneFilter}
													onClick={(e) => this.handleFilterClick(e.target.name, true)}
												>{'全部清單'}</Button>{' '}
												<Button
													name='isTimeFilter'
													variant='outline-secondary'
													size='sm'
													active={this.state.isTimeFilter}
													onClick={(e) => this.handleFilterClick(e.target.name, true)}
												>{'當前出沒'}</Button>{' '}

												{/* toggle more filter */}
												<Accordion.Toggle
													eventKey="0"
													as={Button}
													variant='outline-secondary'
													size='sm'
													style={{ float: 'right' }}
													onClick={() => this.setState({ isCollapseShow: !this.state.isCollapseShow })}
												><FontAwesomeIcon icon={faFilter} /></Accordion.Toggle>
											</td>
										</tr>
									</tbody>
								</Table>
								<Accordion.Collapse eventKey="0">
									<Table className={'filter'}>
										<tbody>
											{/* 名稱 */}
											<tr>
												<th style={{ width: '100px' }}>
													<FontAwesomeIcon icon={faFont} />{' 名稱 : '}
												</th>
												<td>
													<input
														name='filterName'
														value={this.state.filterName}
														className={'form-control form-control-sm'}
														placeholder={'請輸入中/英文蟲名...'}
														onChange={(e) => this.handleFilterClick(e.target.name, e.target.value)}
													/>
												</td>
											</tr>

											{/* 地點 */}
											<tr>
												<th style={{ width: '100px' }}>
													<FontAwesomeIcon icon={faMapMarkerAlt} />{' 地點 : '}
												</th>
												<td>
													{this.state.locationOptions.map((item, index) =>
														<span key={index}>
															<Button
																name='locationPicked'
																variant='outline-secondary'
																size='sm'
																active={this.state.locationPicked.includes(item)}
																onClick={(e) => this.handleFilterClick(e.target.name, e.target.textContent)}
															>{item}</Button>{' '}
														</span>
													)}
												</td>
											</tr>

											{/* 月份 */}
											<tr>
												<th style={{ width: '100px' }}>
													<FontAwesomeIcon icon={faCalendarAlt} />{' 月份 : '}
												</th>
												<td>
													{this.state.monthOptions.map((item, index) =>
														<span key={index}>
															<Button
																name='monthOptions'
																variant='outline-secondary'
																size='sm'
																active={this.state.monthPicked.includes(item)}
																onClick={(e) => this.handleFilterClick(e.target.name, parseInt(e.target.textContent, 10))}
															>{item}</Button>{' '}
														</span>
													)}
												</td>
											</tr>

											{/* 時間 */}
											<tr>
												<th style={{ width: '100px' }}>
													<FontAwesomeIcon icon={faClock} />{' 時間 : '}
												</th>
												<td>
													{this.state.hourOptions.map((item, index) =>
														<span key={index}>
															<Button
																name='hourOptions'
																variant='outline-secondary'
																size='sm'
																active={this.state.hourPicked.includes(item)}
																onClick={(e) => this.handleFilterClick(e.target.name, parseInt(e.target.textContent, 10))}
															>{item}</Button>{' '}
														</span>
													)}
												</td>
											</tr>
										</tbody>
									</Table>
								</Accordion.Collapse>
							</Accordion>
						</span>

						<hr />
						{'共 ' + targetList.length + ' 筆資料符合, 點擊可查看詳細資料...'}
						<hr />
						<span className={'dataList'}>
							{targetList.map((item, index) =>
								<CustomCard
									key={index}
									type={'bug'}
									onClick={() => this.setState({ isDialogShow: true, activeItem: item })}
									object={item}
								/>
							)}
						</span>
					</div >
				}
			</div>
		)
	}
}

BugGuide.defaultProps = {
	dataList: [],
	hemisphere: 'northern'
}

BugGuide.propTypes = {
	dataList: PropTypes.array,
	hemisphere: PropTypes.string
}