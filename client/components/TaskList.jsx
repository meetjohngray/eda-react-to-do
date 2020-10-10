import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import { apiDeleteTask, getAllTasks } from '../apis/index'
import { initTask, deleteTask } from '../actions/index'

class TaskList extends React.Component {

  componentDidMount() {
    getAllTasks()
      .then(task => (this.props.dispatch(initTask(task))))
  }
  
  handleClick = () => {
    // I grab the props tasks, then itererate through each individual task
    this.props.tasks.forEach(task => {
      if(task.isComplete){
        apiDeleteTask(task.id)
          .then(() => {
            this.props.dispatch(deleteTask(task.id))
          })
        } 
      }
    )}

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
              // Once I pass this over, I need to refer to it with this.state.props
              <ListItem task={task}/>
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
    {this.props.tasks.length > 0 ? <button className="clear-completed" onClick={this.handleClick}>Clear completed</button> : ''}
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