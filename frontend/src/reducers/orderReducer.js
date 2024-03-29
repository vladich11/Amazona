import {
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_RESET,
    DELETE_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL,
    DELIVER_ORDER_REQUEST,
    DELIVER_ORDER_RESET,
    DELIVER_ORDER_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_PAY_FAIL, ORDER_PAY_REQUEST,
    ORDER_PAY_RESET, ORDER_PAY_SUCCESS
} from "../constants/orderConstants"

// Create order reducer
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_CREATE_RESET:
            return {}
        default: return state
    }
}


// Order details reducer
export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Pay order reducer
export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

// Get usrr order list reducer
export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_MINE_LIST_REQUEST:
            return { loading: true }
        case ORDER_MINE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_MINE_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        default:
            return state
    }
}

// Get orders list reducer
export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true }
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Delete order reducer
export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return { loading: true }
        case DELETE_ORDER_SUCCESS:
            return { loading: false, success: true }
        case DELETE_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case DELETE_ORDER_RESET:
            return {}
        default:
            return state
    }
}

// Deliver order reducer
export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case DELIVER_ORDER_REQUEST:
            return { loading: true }
        case DELIVER_ORDER_SUCCESS:
            return { loading: false, success: true }
        case DELIVER_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case DELIVER_ORDER_RESET:
            return {}
        default:
            return state
    }
}