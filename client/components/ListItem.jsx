import React from 'react'
import { connect } from 'react-redux'

import {  apiDeleteTask, apiUpdateTask } from '../apis/index'
import { deleteTask, updateTask } from '../actions/index'

class ListItem extends React.Component {
  state = {
    edit_Task: null//Use null when using numbers
  }
  
  handleClick = ( id ) => {
    apiDeleteTask(id)
    .then(() => {
        this.props.dispatch(deleteTask(id))
    })
  }
  
  doubleClick = ( id, event) => {
    this.setState({
      edit_Task: id
    })
  }
  
  handleSubmit = (task, event) => {
    // Create this variable to update the name of the todo based on what is typed in the field
    const value = event.target.value
    // If the enter key is hit, 
    if( event.key === "Enter") {
      // Send the value as an object to the db to update the task name 
      const newTask = { task: value }
      apiUpdateTask(task.id, newTask)
      // then set task.task as the submitted value and dispatch this to global state
      .then(() => {
        task.task = value
        this.props.dispatch(updateTask(task.id, task))
        this.setState({ edit_Task: null })
      })
    }
  }
  
  toggleDone = (id, task, event) => {
    task.isComplete = event.target.checked
    apiUpdateTask(id, task)
      .then(() => {
      this.props.dispatch(updateTask(id, task))
      this.setState({ edit_Task: null })
    })
  }

  liClass = () => {
    if(this.props.task.isComplete){
      return 'completed'
    } else if (this.state.edit_Task){
      return 'editing'
    } else {
      return ''
    }
  }

  render() {
    return (
            <li key={this.props.task.id} 
              // className={this.props.task.isComplete ? 'completed' : '' }
              className={this.liClass()}
            >
              <div className="view">
                {/* <input class="toggle" type="checkbox" checked /> */}
                <input className="toggle" type="checkbox" 
                  onChange={(event) => this.toggleDone(this.props.task.id,this.props.task,event)} 
                  defaultChecked={this.props.task.isComplete} 
                />
                <label onDoubleClick={()=>this.doubleClick(this.props.task.id)}>
                  {(this.state.edit_Task == this.props.task.id) ? 
                  <input type="text" class="edit-todo" defaultValue = {this.props.task.task} 
                    onKeyDown={(event)=>this.handleSubmit(this.props.task, event)}
                  /> 
                  : this.props.task.task}
                </label>
                {/* <p>{task.details}</p> */}
                {/* onClick uses an anonymous function so that we can pass it a parameter. If we didn't do this, it would call handleClick immediately and cause problems */}
                <button className="destroy" 
                  onClick={()=>this.handleClick(this.props.task.id)}>
                </button>
              </div>
            </li>
          )
          }
}

export default connect()(ListItem)


{/* <li class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" checked />
            <label>Taste JavaScript</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Create a TodoMVC template" />
        </li>
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label>Buy a unicorn</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Rule the web" />
        </li> */}