const initialState = {
    user: [],
    vinho: [],
    seeVisitedUser: [],
    searchWine: [],
    pageVisited: [],
    comentsFromPost: [],
    coments: []

};

function rootReducer(state = initialState, action) {

    if (action.type == "ADD_USER") {
        return Object.assign({}, state, {user: action.payload});
    }
    if (action.type == "SHOW_WINE") {
        return Object.assign({}, state, {vinho: action.payload});
    }
    if (action.type == "SHOW_USER") {
        return Object.assign({}, state, {seeVisitedUser: action.payload});
    }
    if (action.type == "SEARCH WINE") {
        return Object.assign({}, state, {searchWine: action.payload});
    }
    if (action.type == 'WHERE_AM_I') {
        return Object.assign({}, state, {pageVisited: state.pageVisited.concat(action.payload)})
    }
    if (action.type == "SHOW_COMENTS_FROM_POST") {
        return Object.assign({}, state, {comentsFromPost: action.payload});
    }
    if (action.type == "SHOW_COMENTS") {
        return Object.assign({}, state, {coments: state.coments.concat(action.payload)})
    }

    // else return current state
    return state;
}

export default rootReducer;