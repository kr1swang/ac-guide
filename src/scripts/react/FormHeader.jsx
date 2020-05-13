import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import UIBlocker from 'react-ui-blocker'

class FormHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <UIBlocker
                    theme="cubeGrid"
                    isVisible={this.props.isBlocking}
                    message="Loading..."
                />
                <h1>動森圖鑑</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isBlocking: state.formHeader.isBlocking
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setBlocking: (flag) => {
        dispatch(actions.setBlocking(flag))
    },
    handleAssignFormHeader: (FormHeader) => {
        dispatch(actions.assignFormDataHeader({ FormHeader: FormHeader }))
    },
    handleAssignFormMain: (FormMain) => {
        dispatch(actions.assignFormDataMain({ FormMain: FormMain }))
    },
    handleAssignFormFoorter: (formFooter) => {
        dispatch(actions.assignFormDataFooter({ formFooter: formFooter }))
    },
    handleAssignValue: (name, value) => {
        dispatch(actions.assignValue(name, value, 'FormHeaderReducer'))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormHeader)