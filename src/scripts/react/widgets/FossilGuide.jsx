import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFossil } from './CustomIcons.jsx'
import { faStar, faFilter, faFont } from '@fortawesome/free-solid-svg-icons'
import CustomDialog from './CustomDialog.jsx'
import CustomCard from './CustomCard.jsx'

export default class FossilGuide extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// control flag
			isCollapseShow: false,
			isDialogShow: false,
			activeItem: {
				index: 0,
				imageUrl: '',
				chineseName: '',
				englishName: '',
				price: '',
				series: '',
				remark: ''
			},
			emptyItem: {
				index: 0,
				imageUrl: '',
				chineseName: '',
				englishName: '',
				price: '',
				series: '',
				remark: ''
			},

			// options
			markedOptions: ['已標記', '未標記'],
			seriesOptions: ['獨立化石', '甲龍', '帝龜', '腕龍', '恐爪龍', '異齒龍', '梁龍', '禽龍', '長毛象', '巨角犀', '大角鹿',
				'大眼魚龍', '厚頭龍', '副櫛龍', '雙葉鈴木龍', '無齒翼龍', '風神翼龍', '劍齒虎', '棘龍', '劍龍', '三角龍', '暴龍'],

			// picked options
			isNoneFilter: false,
			markedPicked: [],
			filterName: '',
			seriesPicked: []
		}

		this.handleFilterClick = this.handleFilterClick.bind(this)
		this.handleConvertFilter = this.handleConvertFilter.bind(this)
	}

	componentDidMount() {
		// default option
		this.handleFilterClick('isNoneFilter', true)
	}

	handleFilterClick(name, value) {
		switch (name) {
			case 'isNoneFilter': {
				this.setState({
					isNoneFilter: true,
					markedPicked: [],
					filterName: '',
					seriesPicked: []
				})
				break
			}
			case 'markedPicked': {
				let markedPicked = JSON.parse(JSON.stringify(this.state.markedPicked))
				let index = markedPicked.indexOf(value)

				index == -1 ? markedPicked.push(value) : markedPicked.splice(index, 1)
				markedPicked.sort((a, b) => a - b)

				this.setState({
					isNoneFilter: false,
					markedPicked: markedPicked
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
			case 'seriesPicked': {
				let seriesPicked = JSON.parse(JSON.stringify(this.state.seriesPicked))
				let index = seriesPicked.indexOf(value)

				index == -1 ? seriesPicked.push(value) : seriesPicked.splice(index, 1)
				seriesPicked.sort((a, b) => a - b)

				this.setState({
					isNoneFilter: false,
					seriesPicked: seriesPicked
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

		// marked
		if (this.state.markedPicked.length > 0) {
			result = result.filter(x => this.props.markedList.includes(x.index) && this.state.markedPicked.includes('已標記')
				|| !this.props.markedList.includes(x.index) && this.state.markedPicked.includes('未標記'))
		}

		// name (chineseName / englishName)
		if (this.state.filterName.length > 0) {
			result = result.filter(x => x.chineseName.indexOf(this.state.filterName) != -1 || x.englishName.indexOf(this.state.filterName) != -1)
		}

		// series
		if (this.state.seriesPicked.length > 0) {
			result = result.filter(x => this.state.seriesPicked.some(y => x.series.indexOf(y) != -1))
		}

		return result
	}

	render() {
		// get filter list
		let targetList = this.handleConvertFilter(this.props.dataList)

		return (
			<Fragment>
				<CustomDialog
					type={'fossil'}
					isDialogShow={this.state.isDialogShow}
					onHide={() => this.setState({ isDialogShow: false, activeItem: this.state.emptyItem })}
					activeItem={this.state.activeItem}
					isMarked={this.props.markedList.includes(this.state.activeItem.index)}
					onChangeMarked={(type, id) => this.props.onChangeMarked(type, id)}
				/>

				<span className={'filterGroup'}>
					<Accordion>
						{/* mainFilter */}
						{this.props.mainFilter}

						{/* fishFilter */}
						<Table className={'filter'}>
							<tbody>
								{/* 快速 */}
								<tr>
									<th style={{ width: '100px' }}>
									</th>
									<td>
										<span>
											<Button
												name='isNoneFilter'
												variant='outline-secondary'
												size='sm'
												active={this.state.isNoneFilter}
												onClick={(e) => this.handleFilterClick(e.target.name, true)}
											>{'全部清單'}</Button>{' '}

											{/* toggle more filter */}
											<Accordion.Toggle
												eventKey="0"
												as={Button}
												variant='outline-secondary'
												size='sm'
												style={{ float: 'right' }}
												onClick={() => this.setState({ isCollapseShow: !this.state.isCollapseShow })}
											><FontAwesomeIcon icon={faFilter} /></Accordion.Toggle>
										</span>
									</td>
								</tr>
							</tbody>
						</Table>
						<Accordion.Collapse eventKey="0">
							<Table className={'filter'}>
								<tbody>
									{/* 標記 */}
									<tr>
										<th style={{ width: '100px' }}>
											<FontAwesomeIcon icon={faStar} />{' 標記 : '}
										</th>
										<td>
											{this.state.markedOptions.map((item, index) =>
												<span key={index}>
													<Button
														name='markedPicked'
														variant='outline-secondary'
														size='sm'
														active={this.state.markedPicked.includes(item)}
														onClick={(e) => this.handleFilterClick(e.target.name, e.target.textContent)}
													>{item}</Button>{' '}
												</span>
											)}
										</td>
									</tr>

									{/* 名稱 */}
									<tr>
										<th>
											<FontAwesomeIcon icon={faFont} />{' 名稱 : '}
										</th>
										<td>
											<span>
												<input
													name='filterName'
													value={this.state.filterName}
													className={'form-control form-control-sm'}
													placeholder={'請輸入中/英文化石名...'}
													onChange={(e) => this.handleFilterClick(e.target.name, e.target.value)}
												/>
											</span>
										</td>
									</tr>

									{/* 系列 */}
									<tr>
										<th>
											<FontAwesomeIcon icon={faFossil} />{' 系列 : '}
										</th>
										<td>
											{this.state.seriesOptions.map((item, index) =>
												<span key={index}>
													<Button
														name='seriesPicked'
														variant='outline-secondary'
														size='sm'
														active={this.state.seriesPicked.includes(item)}
														onClick={(e) => this.handleFilterClick(e.target.name, e.target.textContent)}
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

				<span className={'dataList'}>
					<hr />
					{'共 ' + targetList.length + ' 筆資料符合, 點擊可查看詳細資料並標記!'}
					<hr />
					{targetList.map((item, index) =>
						<CustomCard
							key={index}
							type={'fossil'}
							object={item}
							onClick={() => this.setState({ isDialogShow: true, activeItem: item })}
							isMarked={this.props.markedList.includes(item.index)}
						/>
					)}
				</span>
			</Fragment>
		)
	}
}

FossilGuide.defaultProps = {
	mainFilter: <Fragment />,
	dataList: [],
	markedList: [],
	onChangeMarked: () => { }
}

FossilGuide.propTypes = {
	mainFilter: PropTypes.element,
	dataList: PropTypes.array,
	markedList: PropTypes.array,
	onChangeMarked: PropTypes.func
}