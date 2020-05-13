import actions, { Ks } from '../actions.jsx'

const initialState = {
    msg: 'Copyright © 2020 Kr1sWang'
}

const formFooterReducer = (state = initialState, action) => {
    const match = action.targetReducer === undefined || action.targetReducer === null || action.targetReducer === 'formFooterReducer'

    if (!match) return state

    switch (action.type) {
        case Ks.ASSIGN_VALUE:
            return Object.assign({}, state, { [action.name]: action.value })
        case Ks.ASSIGN_FORM_DATA_FOOTER:
            return Object.assign({}, state, action.appForm)
        default:
            return state
    }
}

export default formFooterReducer