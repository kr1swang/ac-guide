import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faList, faStar } from '@fortawesome/free-solid-svg-icons'

export default class SettingDialog extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Modal show={this.props.isDialogShow} onHide={() => this.props.onHide()}>
				<Modal.Header closeButton>
					<Modal.Title>
						<span style={{ color: '#000000' }}>{'設定'}</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table className={'dialog'} hover={true}>
						<tbody>
							<tr>
								<th colSpan={'2'} style={{ textAlign: 'center' }} >
									<h4 className={'font-weight-bold'}><FontAwesomeIcon icon={faExclamationTriangle} />{' Warning!!'}</h4><br />
									<h5 className={'font-weight-bold'}>{'請確認後再執行操作!!'}</h5>
								</th>
							</tr>
							<tr>
								<th style={{ width: '35%', textAlign: 'center' }}>
									<label><FontAwesomeIcon icon={faList} />{' 清單快取'}</label>
								</th>
								<td style={{ width: '65%' }}>
									<Button
										variant='danger'
										size='sm'
										onClick={() => { confirm('是否確認清除快取?') ? this.props.onCleanCacheData() : {} }}
									><FontAwesomeIcon icon={faExclamationTriangle} />{' 清除'}</Button><br />
									<small>{'※ 預設為2小時自動清除, 清除後請重新點選種類.'}</small>
								</td>
							</tr>
							<tr>
								<th style={{ width: '35%', textAlign: 'center' }}>
									<label><FontAwesomeIcon icon={faStar} />{' 標記紀錄'}</label>
								</th>
								<td style={{ width: '65%' }}>
									<Button
										variant='danger'
										size='sm'
										onClick={() => { confirm('是否確認標記紀錄?') ? this.props.onCleanMarked() : {} }}
									><FontAwesomeIcon icon={faExclamationTriangle} />{' 清除'}</Button><br />
									<small>{'※ 重置"已標記"之紀錄, 清除後無法復原.'}</small>
								</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
			</Modal>
		)
	}
}

SettingDialog.defaultProps = {
	isDialogShow: false,
	onHide: () => { },
	onCleanCacheData: () => { },
	onCleanMarked: () => { }
}

SettingDialog.propTypes = {
	isDialogShow: PropTypes.bool,
	onHide: PropTypes.func,
	onCleanCacheData: PropTypes.func,
	onCleanMarked: PropTypes.func
}