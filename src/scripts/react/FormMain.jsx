import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import FishGuide from './widgets/FishGuide.jsx'
import BugGuide from './widgets/BugGuide.jsx'

class FormMain extends Component {
    constructor(props) {
        super(props)

        this.ajaxGetList = this.ajaxGetList.bind(this)
    }

    componentDidMount() {
        this.ajaxGetList('fish')
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
        }).catch((err) => {
            console.log('Fail! ' + err)
            alert('Fail!')
        }).finally(() => {
            setTimeout(() => this.props.setBlocking(false), 500)
        })
    }

    render() {
        return (
            <div className={'main'}>
                <div>
                    <label>種類 : </label>
                    <button name='type' onClick={(e) => this.ajaxGetList('fish')}>魚類</button>
                    <button name='type' onClick={(e) => this.ajaxGetList('bug')}>蟲類</button>
                    <br />
                    <label>地區 : </label>
                    <button name='hemisphere' onClick={(e) => this.props.handleAssignValue(e.target.name, 'northern')}>北半球</button>
                    <button name='hemisphere' onClick={(e) => this.props.handleAssignValue(e.target.name, 'southern')}>南半球</button>
                    <br />
                    <br />
                </div>
                <div>
                    {this.props.type == 'fish' ? <FishGuide dataList={this.props.dataList} hemisphere={this.props.hemisphere} /> : ''}
                    {this.props.type == 'bug' ? <BugGuide dataList={this.props.dataList} hemisphere={this.props.hemisphere} /> : ''}
                </div>
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