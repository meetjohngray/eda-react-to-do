import { ADD_TASK, INIT_TASK, DEL_TASK, UPDATE_TASK } from '../actions/index'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_TASK:
      return action.task

    case ADD_TASK:
      return [...state, action.task]

    case DEL_TASK:
      return state.filter((task) => task.id !== action.id)

      // A reducer will return anything you want it to
      // case 'Bananas':
      //   return "I like bANANAS!!!"

    case UPDATE_TASK:
      return state.map((task) => {
        if (task.id === action.id) {
          task.task = action.task
          task.isComplete = action.task.isComplete
        }
        return task
      })

    default:
      return state
  }
}

export default reducer
