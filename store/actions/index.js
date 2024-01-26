export function addUser(payload) {

    return {type: "ADD_USER", payload}
}

export function showWine(payload) {

    return {type: "SHOW_WINE", payload}
}

export function showUser(payload) {

    return {type: "SHOW_USER", payload}
}

export function searchWine(payload) {

    return {type: "SEARCH_WINE", payload}
}

export function whereAmI(payload) {
    return {type: 'WHERE_AM_I', payload}
}

export function showComentsFromPost(payload) {
    return {type: "SHOW_COMENTS_FROM_POST", payload}
}

export function showComents(payload) {
    return {type: "SHOW_COMENTS", payload}
}