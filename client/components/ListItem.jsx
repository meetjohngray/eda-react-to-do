import React, { useState } from 'react'
import { connect } from 'react-redux'

import { apiDeleteTask, apiUpdateTask } from '../apis/index'
import { deleteTask, updateTask } from '../actions/index'

function ListItem (props) {
  // state = {
  //   edit_Task: null // Use null when using numbers
  // }
  const [editTask, setEditTask] = useState(null)

  const handleClick = (id) => {
    apiDeleteTask(id)
      .then(() => {
        props.dispatch(deleteTask(id))
        return null
      })
      .catch(err => console.log(err))
  }

  const doubleClick = (id) => {
    setEditTask(id)
  }

  const handleSubmit = (task, event) => {
    // Create this variable to update the name of the todo based on what is typed in the field
    const value = event.target.value
    // If the enter key is hit,
    if (event.key === 'Enter') {
      // Send the value as an object to the db to update the task name
      const newTask = { task: value }
      apiUpdateTask(task.id, newTask)
      // then set task.task as the submitted value and dispatch this to global state
        .then(() => {
          task.task = value
          props.dispatch(updateTask(task))
          setEditTask({ editTask: null })
          return null
        })
        .catch(err => console.log(err))
    }
  }

  const toggleDone = (id, task, event) => {
    task.isComplete = event.target.checked
    apiUpdateTask(id, task)
      .then(() => {
        props.dispatch(updateTask(id, task))
        setEditTask({ editTask: null })
        return null
      })
      .catch(err => console.log(err))
  }

  const liClass = () => {
    if (props.task.isComplete) {
      return 'completed'
    } else if (editTask) {
      return 'editing'
    } else {
      return ''
    }
  }

  return (
    <li key={props.task.id} className={ liClass() }>
      <div className="view">
        {/* <input class="toggle" type="checkbox" checked /> */}
        <input className="toggle" type="checkbox"
          onChange={(event) => toggleDone(props.task.id, props.task, event)}
          defaultChecked={props.task.isComplete}
        />
        <label onDoubleClick={() => doubleClick(props.task.id)}>
          {(editTask === props.task.id)
            ? <input type="text" className="edit-todo" defaultValue = {props.task.task}
              onKeyDown={(event) => handleSubmit(props.task, event)}
            />
            : props.task.task}
        </label>
        {/* <p>{task.details}</p> */}
        {/* onClick uses an anonymous function so that we can pass it a parameter. If we didn't do this, it would call handleClick immediately and cause problems */}
        <button className="destroy"
          onClick={() => handleClick(props.task.id)}>
        </button>
      </div>
    </li>
  )
}

export default connect()(ListItem)
