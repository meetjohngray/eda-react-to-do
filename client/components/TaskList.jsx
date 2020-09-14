import React from 'react'
import { connect } from 'react-redux'
// import { deleleItem } from '../actions/shopping'

import { getAllTasks } from '../apis/index'
import { initTask} from '../actions/index'

class TaskList extends React.Component {
  
  componentDidMount() {
    getAllTasks()
      .then(task => (this.props.dispatch(initTask(task))))
      console.log(this.props)
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
            <li key={task.id}>
              <div className="view">
                {/* <input class="toggle" type="checkbox" checked /> */}
                <input class="toggle" type="checkbox" />
                <label>{task.task}</label>
                <button class="destroy"></button>
                <input class="edit" value="Create a TodoMVC template" />
            </div>
            </li>
          )
        })}
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
      </ul>
    </section>
    <footer className="footer">
    {/* <!-- This should be `0 items left` by default --> */}
    <span className="todo-count"><strong>0</strong> item left</span>
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