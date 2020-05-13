import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Image, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faMoneyBillAlt, faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons'
import TimeBar from './TimeBar.jsx'

export default class BugDialog extends Component {
    constructor(props) {
        super(props)

        this.handelCheckIsOnline = this.handelCheckIsOnline.bind(this)
    }

    handelCheckIsOnline(hemisphere, item) {
        let result = false
        let dateNow = new Date()

        let itemMonths = hemisphere == 'northern' ? (item.northernMonths || []) : (item.southernMonths || [])
        let itemHours = (item.appearanceTime || [])

        if (itemMonths.includes(dateNow.getMonth() + 1) && itemHours.includes(dateNow.getHours())) {
            result = true
        }

        return result
    }

    render() {
        return (
            <Modal show={this.props.isDialogShow} onHide={(e) => this.props.onHide()}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.handelCheckIsOnline('northern', this.props.activeItem)
                            ? <FontAwesomeIcon icon={faCircle} style={{ color: '#42B72A', verticalAlign: 'middle', fontSize: 'x-small' }} />
                            : <FontAwesomeIcon icon={faCircle} style={{ color: '#E9EBEE', verticalAlign: 'middle', fontSize: 'x-small' }} />
                        }{' 北半球 / '}
                        {this.handelCheckIsOnline('southern', this.props.activeItem)
                            ? <FontAwesomeIcon icon={faCircle} style={{ color: '#42B72A', verticalAlign: 'middle', fontSize: 'x-small' }} />
                            : <FontAwesomeIcon icon={faCircle} style={{ color: '#E9EBEE', verticalAlign: 'middle', fontSize: 'x-small' }} />
                        }{' 南半球'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className={'dialog'} hover={true}>
                        <tbody>
                            <tr>
                                <th colSpan={'2'} style={{ textAlign: 'center' }} >
                                    <Image src={this.props.activeItem.imageURL} fluid={true} />
                                    <h4 className={'font-weight-bold'}>
                                        {this.props.activeItem.chineseName}<br />
                                        {this.props.activeItem.englishName}
                                    </h4>
                                </th>
                            </tr>
                            <tr>
                                <th style={{ width: '30%', textAlign: 'center' }}>
                                    <h5><FontAwesomeIcon icon={faMoneyBillAlt} />{' 價錢'}</h5>
                                </th>
                                <td>
                                    <h5>{this.props.activeItem.price}
                                        <small>{' 鈴錢'}</small>
                                    </h5>
                                </td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <h5><FontAwesomeIcon icon={faMapMarkerAlt} />{' 地點'}</h5>
                                </th>
                                <td>
                                    <h5>{this.props.activeItem.location}</h5>
                                    {this.props.activeItem.remark != '' ? <small>{'※ ' + this.props.activeItem.remark}</small> : ''}
                                </td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <label><FontAwesomeIcon icon={faCalendarAlt} />{' 北半球月份'}</label>
                                </th>
                                <td>
                                    <TimeBar type={'month'} data={this.props.activeItem.northernMonths} />
                                </td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <label><FontAwesomeIcon icon={faCalendarAlt} />{' 南半球月份'}</label>
                                </th>
                                <td>
                                    <TimeBar type={'month'} data={this.props.activeItem.southernMonths} />
                                </td>
                            </tr>
                            <tr>
                                <th style={{ textAlign: 'center' }}>
                                    <h5><FontAwesomeIcon icon={faClock} />{' 時間'}</h5>
                                </th>
                                <td>
                                    <TimeBar type={'hour'} data={this.props.activeItem.appearanceTime} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        )
    }
}

BugDialog.defaultProps = {
    isDialogShow: false,
    onHide: () => { },
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
    }
}

BugDialog.propTypes = {
    isDialogShow: PropTypes.bool,
    onHide: PropTypes.func,
    activeItem: PropTypes.object
}