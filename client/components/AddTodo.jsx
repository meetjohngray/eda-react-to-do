import React from 'react'
import { connect } from 'react-redux'
import { apiAddTask } from '../apis/index'
import { addTask } from '../actions/index'

class  AddTodo extends React.Component {
  
  state = {
    task: ''
  }

  handleChange = (event) => {
    // console.log('hi')
    this.setState({
        task: event.target.value
    })
  }

  handleSubmit = (event) => {
    if( event.key == "Enter") {
      console.log("yes")
      // this.setState({ task: '' })
      // const newTask = {task: this.state.task}
  
      apiAddTask(this.state)
          .then(id => {
              // newTask.id = id
              this.props.dispatch(addTask(this.state))
              this.setState({ task: '' })
              // console.log('id')
          })
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
