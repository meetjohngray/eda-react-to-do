import React from 'react'
import { connect } from 'react-redux'

import { getAllTasks, apiDeleteTask, apiUpdateTask } from '../apis/index'
import { initTask, deleteTask, updateTask } from '../actions/index'

class TaskList extends React.Component {
  state = {
    edit_Task: null //Use null when using numbers
  }

  componentDidMount() {
    getAllTasks()
      .then(task => (this.props.dispatch(initTask(task))))
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


  render() {
    return (
      <>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {/* <!-- These are here just to show the structure of the list items --> */}
          {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
          {this.props.tasks.map(task => {
            return (
              <li key={task.id} className={task.isComplete ? 'completed' : ''}>
                {/* {console.log(task.isComplete)} */}
                <div className="view">
                  {/* <input class="toggle" type="checkbox" checked /> */}
                  <input className="toggle" type="checkbox" 
                    onChange={(event) => this.toggleDone(task.id,task,event)} 
                    defaultChecked={task.isComplete} 
                  />
                  <label onDoubleClick={()=>this.doubleClick(task.id)}>
                    {(this.state.edit_Task == task.id) ? 
                    <input type="text" defaultValue = {task.task} 
                      onKeyDown={(event)=>this.handleSubmit(task, event)}
                    /> 
                    : task.task}
                  </label>
                  {/* <p>{task.details}</p> */}
                  {/* onClick uses an anonymous function so that we can pass it a parameter. If we didn't do this, it would call handleClick immediately and cause problems */}
                  <button className="destroy" 
                    onClick={()=>this.handleClick(task.id)}>
                  </button> 
                  <input className="edit" value="Create a TodoMVC template" />
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    
    <footer className="footer">
    {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count"><strong>{this.props.tasks.length}</strong> item left</span>
    {/* <!-- Remove this if you don't implement routing --> */}
    <ul className="filters">
      <li>
        <a className="selected" href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    {/* <!-- Hidden if no completed items are left ↓ --> */}
    <button className="clear-completed">Clear completed</button>
  </footer>
  </>
    )
  }
}

function mapStateToProps(globalState) {
  return { tasks: globalState.tasks}
}

export default connect(mapStateToProps)(TaskList)


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