import React, { useState } from 'react'
import { connect } from 'react-redux'
import { apiAddTask } from '../apis/index'
import { addTask } from '../actions/index'

const AddTodo = (props) => {
  // Set the initial state of task
  // state = {
  //   task: ''
  // }

  const [task, setTask] = useState('')

  const handleChange = (event) => {
    // Get the change from the input field and put it in task state
    setTask(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add the task to the db
    apiAddTask({ task: task })
    // We need the id so that after we add the task, the edit task form doesn't fire
      .then((id) => {
        //  We turn our info into an object...
        const taskObj = {
          task: task,
          id: id
        }
        // And give this object to our action to change the current state to reflect the changes
        props.dispatch(addTask(taskObj))
        // Reset the form to an empty string
        setTask('')
        return null
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={task}
        onChange={handleChange}
        // onKeyDown={this.handleSubmit}
      />
    </form>
  )
}

export default connect()(AddTodo)
