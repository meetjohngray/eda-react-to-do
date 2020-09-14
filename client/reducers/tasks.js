import { ADD_TASK, INIT_TASK, DEL_TASK } from '../actions/index'

const initialState = []

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case INIT_TASK:
      return action.task

    case ADD_TASK:
      return [...state, action.task]
    
    case DEL_TASK: 
      return state.filter((task) => task !==  action.task)

    default:
      return state
  }
}

export default reducer