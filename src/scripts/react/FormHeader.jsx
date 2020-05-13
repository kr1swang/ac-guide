import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './actions.jsx'
import apiClient from './apiClient.jsx'
import UIBlocker from 'react-ui-blocker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'

class FormHeader extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.title = this.props.htmlTitle
    }

    render() {
        return (
            <div className={'header'}>
                <UIBlocker
                    theme="cubeGrid"
                    isVisible={this.props.isBlocking}
                    message="Loading..."
                />
                <h3>
                    <FontAwesomeIcon icon={faMobileAlt} />{' '}
                    {this.props.htmlTitle}
                </h3>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isBlocking: state.formHeader.isBlocking,
    htmlTitle: state.formHeader.htmlTitle
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