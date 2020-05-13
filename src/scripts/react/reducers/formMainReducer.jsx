import actions, { Ks } from '../actions.jsx'

const initialState = {
    type: 'bug',
    hemisphere: 'northern',
    dataList: []
}

const formMainReducer = (state = initialState, action) => {
    const match = action.targetReducer === undefined || action.targetReducer === null || action.targetReducer === 'formMainReducer'

    if (!match) return state

    switch (action.type) {
        case Ks.ASSIGN_VALUE: {
            return Object.assign({}, state, { [action.name]: action.value })
        }
        case Ks.ASSIGN_FORM_DATA_MAIN: {
            return Object.assign({}, state, action.formMain)
        }
        default: {
            return state
        }
    }
}

export default formMainReducer