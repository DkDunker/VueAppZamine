export function setUser(state,{ username, login }){
    state.username = username
    state.isLogged = true
    state.error = false
    state.errorMessage = ''
    state.token = 'Bearer ' + login.data.token
}

export function logout(state){
    state.username = null
    state.isLogged = false
}   

export function authError(state, error){
    state.error = true
    state.errorMessage = error
    state.username = null
    state.isLogged = false
} 
