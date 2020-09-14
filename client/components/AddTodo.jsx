import React from 'react'
import { connect } from 'react-redux'
import { getAllTasks } from '../apis/index'

function AddTodo(props) {
    return (
      <>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} />
      </>
    )
}

export default AddTodo
