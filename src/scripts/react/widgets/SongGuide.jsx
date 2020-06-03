import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFilter, faFont, faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import CustomDialog from './CustomDialog.jsx'
import CustomCard from './CustomCard.jsx'

export default class SongGuide extends Component {
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
				remark: ''
			},
			emptyItem: {
				index: 0,
				imageUrl: '',
				chineseName: '',
				englishName: '',
				remark: ''
			},

			// options
			markedOptions: ['已標記', '未標記'],
			limitedOptions: ['非限定', '限定版'],

			// picked options
			isNoneFilter: false,
			markedPicked: [],
			filterName: '',
			limitedPicked: []
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
					filterName: ''
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
			case 'limitedPicked': {
				let limitedPicked = JSON.parse(JSON.stringify(this.state.limitedPicked))
				let index = limitedPicked.indexOf(value)

				index == -1 ? limitedPicked.push(value) : limitedPicked.splice(index, 1)
				limitedPicked.sort((a, b) => a - b)

				this.setState({
					isNoneFilter: false,
					limitedPicked: limitedPicked
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
			result = result.filter(x => x.chineseName.indexOf(this.state.filterName) != -1 || x.englishName.toLowerCase().indexOf(this.state.filterName.toLowerCase()) != -1)
		}

		// limited
		if (this.state.limitedPicked.length > 0) {
			result = result.filter(x => x.remark.indexOf('Nook購物') != -1 && this.state.limitedPicked.includes('非限定')
				|| x.remark.indexOf('非賣品') != -1 && this.state.limitedPicked.includes('限定版'))
		}

		return result
	}

	render() {
		// get filter list
		let targetList = this.handleConvertFilter(this.props.dataList)

		return (
			<Fragment>
				<CustomDialog
					type={'song'}
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
													placeholder={'請輸入中/英文唱片名...'}
													onChange={(e) => this.handleFilterClick(e.target.name, e.target.value)}
												/>
											</span>
										</td>
									</tr>

									{/* 限定 */}
									<tr>
										<th>
											<FontAwesomeIcon icon={faCompactDisc} />{' 限定 : '}
										</th>
										<td>
											{this.state.limitedOptions.map((item, index) =>
												<span key={index}>
													<Button
														name='limitedPicked'
														variant='outline-secondary'
														size='sm'
														active={this.state.limitedPicked.includes(item)}
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
							type={'song'}
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

SongGuide.defaultProps = {
	mainFilter: <Fragment />,
	dataList: [],
	markedList: [],
	onChangeMarked: () => { }
}

SongGuide.propTypes = {
	mainFilter: PropTypes.element,
	dataList: PropTypes.array,
	markedList: PropTypes.array,
	onChangeMarked: PropTypes.func
}