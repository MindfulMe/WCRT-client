import { combineReducers } from 'redux'
function selectedSubreddit(state = 'reactjs') {
    return state
}
function postsBySubreddit(state = {}) {
    return state
}
const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})
export default rootReducer