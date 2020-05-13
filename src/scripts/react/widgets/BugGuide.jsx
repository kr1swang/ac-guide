import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import Media from 'react-bootstrap/Media'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'

import TimeBar from './TimeBar.jsx'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

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
            locationPicked: [],
            monthPicked: [],
            hourPicked: [],
            namePicked: ''
        }

        this.handleFilterClick = this.handleFilterClick.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
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
            case 'locationPicked': {
                let locationPicked = JSON.parse(JSON.stringify(this.state.locationPicked))
                let index = locationPicked.indexOf(value)

                if (index == -1) {
                    locationPicked.push(value)
                } else {
                    locationPicked.splice(index, 1)
                }

                this.setState({
                    locationPicked: locationPicked
                })
                break
            }
            case 'monthOptions': {
                let monthPicked = JSON.parse(JSON.stringify(this.state.monthPicked))
                let index = monthPicked.indexOf(value)

                if (index == -1) {
                    monthPicked.push(value)
                } else {
                    monthPicked.splice(index, 1)
                }

                this.setState({
                    monthPicked: monthPicked
                })
                break
            }
            case 'hourOptions': {
                let hourPicked = JSON.parse(JSON.stringify(this.state.hourPicked))
                let index = hourPicked.indexOf(value)

                if (index == -1) {
                    hourPicked.push(value)
                } else {
                    hourPicked.splice(index, 1)
                }

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

    handleItemClick(item) {
        this.setState({
            isDialogShow: true,
            activeItem: item
        })
        // alert(item.chineseName + ' ' + item.englishName)
        console.log('handleItemClick', item)
    }

    render() {
        // get filter list
        let targetList = this.props.dataList

        // location
        targetList = this.state.locationPicked.length > 0 ? targetList.filter(x => this.state.locationPicked.includes(x.location)) : targetList
        // month (hemisphere)
        this.props.hemisphere == 'northern'
            ? (targetList = this.state.monthPicked.length > 0 ? targetList.filter(x => x.northernMonths.some(y => this.state.monthPicked.includes(y))) : targetList)
            : (targetList = this.state.monthPicked.length > 0 ? targetList.filter(x => x.southernMonths.some(y => this.state.monthPicked.includes(y))) : targetList)
        // hour
        targetList = this.state.hourPicked.length > 0 ? targetList.filter(x => x.appearanceTime.some(y => this.state.hourPicked.includes(y))) : targetList

        return (
            <div>
                <Modal show={this.state.isDialogShow} onHide={(e) => this.setState({ isDialogShow: false, activeItem: {} })}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title>{this.state.activeItem.chineseName}</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Table className={'dialog'} hover={true}>
                            <tbody>
                                <tr>
                                    <th colSpan={'2'} style={{ textAlign: 'center' }} >
                                        <Image src={this.state.activeItem.imageURL} fluid={true} />
                                        <h4 className={'font-weight-bold'}>{this.state.activeItem.chineseName + ' ' + this.state.activeItem.englishName}</h4>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: '30%', textAlign: 'center' }}>
                                        <h5>價錢 : </h5>
                                    </th>
                                    <td>
                                        <h5>{this.state.activeItem.price}
                                        <small>{' 鈴錢'}</small>
                                        </h5>
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>
                                        <h5>地點 : </h5>
                                    </th>
                                    <td>
                                        <h5>{this.state.activeItem.location}</h5>
                                        {this.state.activeItem.remark != '' ? <small>{'※ ' + this.state.activeItem.remark}</small> : ''}
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>
                                        <label>北半球月份 : </label>
                                    </th>
                                    <td>
                                        <TimeBar type={'month'} data={this.state.activeItem.northernMonths} />
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>
                                        <label>南半球月份 : </label>
                                    </th>
                                    <td>
                                        <TimeBar type={'month'} data={this.state.activeItem.southernMonths} />
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>
                                        <h5>時間 : </h5>
                                    </th>
                                    <td>
                                        <TimeBar type={'hour'} data={this.state.activeItem.appearanceTime} />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>

                {this.props.dataList.length == 0 ? '' :
                    <div>
                        <span className={'filterGroup'}>
                            <Table className={'filter'} borderless={true} >
                                {/* 地點 */}
                                <tbody>
                                    <tr>
                                        <th style={{ width: '100px' }}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />{' 地點 : '}
                                        </th>
                                        <td>
                                            {this.state.locationOptions.map((item, index) =>
                                                <span key={index}>
                                                    <Button
                                                        name='locationPicked'
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        active={this.state.locationPicked.includes(item)}
                                                        onClick={(e) => this.handleFilterClick(e.target.name, e.target.textContent)}
                                                    >{item}</Button>{' '}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>

                                {/* 月份 */}
                                <tbody>
                                    <tr>
                                        <th style={{ width: '100px' }}>
                                            <FontAwesomeIcon icon={faCalendarAlt} />{' 月份 : '}
                                        </th>
                                        <td>
                                            {this.state.monthOptions.map((item, index) =>
                                                <span key={index}>
                                                    <Button
                                                        name='monthOptions'
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        active={this.state.monthPicked.includes(item)}
                                                        onClick={(e) => this.handleFilterClick(e.target.name, parseInt(e.target.textContent, 10))}
                                                    >{item}</Button>{' '}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>

                                {/* 時間 */}
                                <tbody>
                                    <tr>
                                        <th style={{ width: '100px' }}>
                                            <FontAwesomeIcon icon={faClock} />{' 時間 : '}
                                        </th>
                                        <td>
                                            {this.state.hourOptions.map((item, index) =>
                                                <span key={index}>
                                                    <Button
                                                        name='hourOptions'
                                                        variant="outline-secondary"
                                                        size="sm"
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

                        <span className={'dataList'}>
                            {targetList.map((item, index) =>
                                <Media key={index} onClick={(e) => this.handleItemClick(item)}>
                                    <img
                                        style={{ width: '20%', maxWidth: '80px', margin: '0 10px' }}
                                        src={item.imageURL}
                                    />
                                    <Media.Body>
                                        <h4>
                                            <span className={'font-weight-bold'} style={{ verticalAlign: 'middle' }}>{item.chineseName}</span>{' '}
                                            <Badge pill variant="secondary">{item.price}</Badge>
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