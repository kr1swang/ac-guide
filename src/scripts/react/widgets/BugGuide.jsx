import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Media, Badge, Button, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import BugDialog from './BugDialog.jsx'

export default class BugGuide extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // control dialog show
            isDialogShow: false,
            activeItem: {},

            // options
            locationOptions: [],
            monthOptions: [],
            hourOptions: [],

            // picked options
            isNotFilter: true,
            isTimeFilter: false,
            filterName: '',
            locationPicked: [],
            monthPicked: [],
            hourPicked: [],
        }

        this.handleFilterClick = this.handleFilterClick.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataList !== prevProps.dataList) {
            let locationList = this.props.dataList.map(x => x.location)
            let locationOptions = locationList.filter((x, i) => locationList.indexOf(x) === i)

            let monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            let hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

            this.setState({
                locationOptions: locationOptions,
                monthOptions: monthOptions,
                hourOptions: hourOptions
            })
        }
    }

    handleFilterClick(name, value) {
        switch (name) {
            case 'isNotFilter': {
                console.log('------尚未實作------', name, value)
                // 清除所有選項時, 需改變flag
                break
            }
            case 'isTimeFilter': {
                console.log('------尚未實作------', name, value)
                // 每分鐘檢查
                break
            }
            case 'filterName': {
                console.log('------尚未實作------', name, value)
                // 檢查'中文名稱'及'英文名稱'
                break
            }
            case 'locationPicked': {
                let locationPicked = JSON.parse(JSON.stringify(this.state.locationPicked))
                let index = locationPicked.indexOf(value)

                index == -1 ? locationPicked.push(value) : locationPicked.splice(index, 1)

                this.setState({
                    locationPicked: locationPicked
                })
                break
            }
            case 'monthOptions': {
                let monthPicked = JSON.parse(JSON.stringify(this.state.monthPicked))
                let index = monthPicked.indexOf(value)

                index == -1 ? monthPicked.push(value) : monthPicked.splice(index, 1)

                this.setState({
                    monthPicked: monthPicked
                })
                break
            }
            case 'hourOptions': {
                let hourPicked = JSON.parse(JSON.stringify(this.state.hourPicked))
                let index = hourPicked.indexOf(value)

                index == -1 ? hourPicked.push(value) : hourPicked.splice(index, 1)

                this.setState({
                    hourPicked: hourPicked
                })
                break
            }
            default: {
                break
            }
        }
    }

    render() {
        // get filter list
        let targetList = this.props.dataList

        // location
        targetList = this.state.locationPicked.length > 0 ? targetList.filter(x => this.state.locationPicked.includes(x.location)) : targetList
        // month (and hemisphere)
        this.props.hemisphere == 'northern'
            ? (targetList = this.state.monthPicked.length > 0 ? targetList.filter(x => x.northernMonths.some(y => this.state.monthPicked.includes(y))) : targetList)
            : (targetList = this.state.monthPicked.length > 0 ? targetList.filter(x => x.southernMonths.some(y => this.state.monthPicked.includes(y))) : targetList)
        // hour
        targetList = this.state.hourPicked.length > 0 ? targetList.filter(x => x.appearanceTime.some(y => this.state.hourPicked.includes(y))) : targetList

        return (
            <div>
                <BugDialog
                    isDialogShow={this.state.isDialogShow}
                    onHide={(e) => this.setState({ isDialogShow: false, activeItem: {} })}
                    activeItem={this.state.activeItem}
                />

                {this.props.dataList.length == 0 ? '' :
                    <div>
                        <span className={'filterGroup'}>
                            <Table className={'filter'}>
                                <tbody>
                                    {/* 快速 */}
                                    <tr>
                                        <th style={{ width: '100px' }}>
                                        </th>
                                        <td>
                                            <Button
                                                name='isNotFilter'
                                                variant='outline-secondary'
                                                size='sm'
                                                active={this.state.isNotFilter}
                                                onClick={(e) => this.handleFilterClick(e.target.name, e.target.textContent)}
                                            >{'全部清單'}</Button>{' '}
                                            <Button
                                                name='isTimeFilter'
                                                variant='outline-secondary'
                                                size='sm'
                                                active={this.state.isTimeFilter}
                                                onClick={(e) => this.handleFilterClick(e.target.name, e.target.textContent)}
                                            >{'當前出沒'}</Button>{' '}
                                        </td>
                                    </tr>

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
                        </span>
                        <hr />
                            {'共搜尋到 ' + targetList.length + ' 筆, 點擊搜尋結果可察看詳細資料...'}
                        <hr />
                        <span className={'dataList'}>
                            {targetList.map((item, index) =>
                                <Media key={index} onClick={(e) => this.setState({ isDialogShow: true, activeItem: item })}>
                                    <Image
                                        style={{ width: '20%', maxWidth: '80px', margin: '0 10px' }}
                                        src={item.imageURL}
                                    />
                                    <Media.Body>
                                        <h4>
                                            <span className={'font-weight-bold'} style={{ verticalAlign: 'middle' }}>{item.chineseName}</span>{' '}
                                            <Badge pill variant='secondary'>{item.price}</Badge>
                                        </h4>
                                        <p style={{ marginBottom: '0px' }}>
                                            {item.location}
                                            {item.remark != '' ? <small><br />{'※ ' + item.remark}</small> : ''}
                                        </p>
                                    </Media.Body>
                                </Media>
                            )}
                        </span>
                    </div>
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