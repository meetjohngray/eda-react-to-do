import React from 'react'
import { connect } from 'react-redux'
import { apiAddTask } from '../apis/index'
import { addTask } from '../actions/index'

class  AddTodo extends React.Component {
  
  // Set the initial state of task
  state = {
    task: ''
  }

  handleChange = (event) => {
    // Get the change from the input field and put it in task state
    this.setState({
        task: event.target.value
    })
  }

  handleSubmit = (event) => {
    // If the enter key is used, do the following
    if( event.key == "Enter") {
      // Add the task to the db
      apiAddTask(this.state)
         .then(
          // Change the current state to reflect the change
          this.props.dispatch(addTask(this.state)),
          // Reset the form to an empty string
          this.setState({ task: '' })
          )
    }
}
  render(){
    return (
      <>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} value={this.state.task} onChange={this.handleChange} onKeyDown={this.handleSubmit}/>
      </>
    )
  } 
}

export default connect()(AddTodo)
