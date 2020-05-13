import actions, { Ks } from '../actions.jsx'

const initialState = {
    isBlocking: false,
    htmlTitle: 'ac-Guide 動森圖鑑'
}

const formHeaderReducer = (state = initialState, action) => {
    const match = action.targetReducer === undefined || action.targetReducer === null || action.targetReducer === 'formHeaderReducer'

    if (!match) return state

    switch (action.type) {
        case Ks.SET_BLOCKING: {
            return Object.assign({}, state, { isBlocking: action.flag });
        }
        case Ks.ASSIGN_VALUE: {
            return Object.assign({}, state, { [action.name]: action.value })
        }
        case Ks.ASSIGN_FORM_DATA_HEADER: {
            return Object.assign({}, state, action.appForm)
        }
        default: {
            return state
        }
    }
}

export default formHeaderReducer