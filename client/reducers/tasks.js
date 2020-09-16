import { ADD_TASK, INIT_TASK, DEL_TASK, UPDATE_TASK } from '../actions/index'

const initialState = []

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case INIT_TASK:
      return action.task

    case ADD_TASK:
      return [...state, action.task]
    
    case DEL_TASK: 
      return state.filter((task) => task.id !==  action.task)
    
    // case 'Bananas':
    //   return "I like bANANAS!!!"
    

    case UPDATE_TASK: 
      return state.map((task)=>{
        if(task.id === action.id ){
          task.task = action.task.task
          task.isCompleted = action.task.isCompleted
        }
        return task
      })

    default:
      return state
  }
}

export default reducer