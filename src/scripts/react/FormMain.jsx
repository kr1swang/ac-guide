import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import FishGuide from './widgets/FishGuide.jsx'
import BugGuide from './widgets/BugGuide.jsx'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFish, faBug, faGlobeAmericas, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

class FormMain extends Component {
    constructor(props) {
        super(props)

        this.ajaxGetList = this.ajaxGetList.bind(this)
    }

    componentDidMount() {
        this.ajaxGetList(this.props.type)
    }

    ajaxGetList(type) {
        this.props.setBlocking(true)

        const args = {
            type: type
        }

        apiClient.GetList(args).then((resp) => {
            const result = resp.data

            this.props.handleAssignFormMain({
                type: type,
                hemisphere: this.props.hemisphere,
                dataList: result
            })

            setTimeout(() => this.props.setBlocking(false), 100)
        }).catch((err) => {
            console.log('Fail! ' + err)
            alert('Fail!')
        })
    }

    render() {
        return (
            <div className={'main'}>
                <span className={'filterGroup'}>
                    <Table className={'filter'} borderless={true} >
                        {/* 種類 */}
                        <tbody>
                            <tr>
                                <th style={{ width: '100px' }}>
                                    <FontAwesomeIcon icon={faBook} />{' 種類 : '}
                                </th>
                                <td>
                                    <Button name='type' variant="outline-secondary" size="sm" active={this.props.type == 'fish' ? true : false} onClick={(e) => this.ajaxGetList('fish')}>
                                        <FontAwesomeIcon icon={faFish} />{' 魚類'}
                                    </Button>{' '}
                                    <Button name='type' variant="outline-secondary" size="sm" active={this.props.type == 'bug' ? true : false} onClick={(e) => this.ajaxGetList('bug')}>
                                        <FontAwesomeIcon icon={faBug} />{' 蟲類'}
                                    </Button>{' '}
                                </td>
                            </tr>
                        </tbody>

                        {/* 種類 */}
                        <tbody>
                            <tr>
                                <th style={{ width: '100px' }}>
                                    <FontAwesomeIcon icon={faGlobeAmericas} />{' 地區 : '}
                                </th>
                                <td>
                                    <Button name='hemisphere' variant="outline-secondary" size="sm" active={this.props.hemisphere == 'northern' ? true : false} onClick={(e) => this.props.handleAssignValue(e.target.name, 'northern')}>
                                        <FontAwesomeIcon icon={faChevronUp} />{' 北半球'}
                                    </Button>{' '}
                                    <Button name='hemisphere' variant="outline-secondary" size="sm" active={this.props.hemisphere == 'southern' ? true : false} onClick={(e) => this.props.handleAssignValue(e.target.name, 'southern')}>
                                        <FontAwesomeIcon icon={faChevronDown} />{' 南半球'}
                                    </Button>{' '}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </span>
                <span>
                    {this.props.type == 'fish' ? <FishGuide dataList={this.props.dataList} hemisphere={this.props.hemisphere} /> : ''}
                    {this.props.type == 'bug' ? <BugGuide dataList={this.props.dataList} hemisphere={this.props.hemisphere} /> : ''}
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isBlocking: state.formHeader.isBlocking,
    type: state.formMain.type,
    hemisphere: state.formMain.hemisphere,
    dataList: state.formMain.dataList,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setBlocking: (flag) => {
        dispatch(actions.setBlocking(flag))
    },
    handleAssignFormHeader: (formHeader) => {
        dispatch(actions.assignFormDataHeader({ formHeader: formHeader }))
    },
    handleAssignFormMain: (formMain) => {
        dispatch(actions.assignFormDataMain({ formMain: formMain }))
    },
    handleAssignFormFoorter: (formFooter) => {
        dispatch(actions.assignFormDataFooter({ formFooter: formFooter }))
    },
    handleAssignValue: (name, value) => {
        dispatch(actions.assignValue(name, value, 'formMainReducer'))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormMain)