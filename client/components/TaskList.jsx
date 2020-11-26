import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import { apiDeleteTask, getAllTasks } from '../apis/index'
import { initTask, deleteTask } from '../actions/index'

class TaskList extends React.Component {
  state = {
    filter: 'all'
  }

  componentDidMount () {
    getAllTasks()
      .then(task => {
        this.props.dispatch(initTask(task))
      })
      .catch(err => console.log(err))
  }

  handleClick = () => {
    // I grab the props tasks, then itererate through each individual task
    this.props.tasks.forEach(task => {
      if (task.isComplete) {
        apiDeleteTask(task.id)
          .then(() => {
            this.props.dispatch(deleteTask(task.id))
          })
          .catch(err => console.log(err))
      }
    }
    )
  }

  filterClick = (event, filter) => {
    event.preventDefault()
    this.setState({
      filter: filter
    })
  }

  render () {
    return (
      <>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {/* <!-- These are here just to show the structure of the list items --> */}
            {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}

            {this.props.tasks.filter(task => {
              switch (this.state.filter) {
                case 'active':
                  return !task.isComplete
                case 'completed':
                  return task.isComplete
                default:
                  return true
              }
            })
              .map(task => {
                // Once I pass this over, I need to refer to it with this.state.props
                return <ListItem key= {task.id} task={task}/>
              })
            }
          </ul>
        </section>

        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count"><strong>{this.props.tasks.length}</strong> item left</span>
          {/* <!-- Remove this if you don't implement routing --> */}
          <ul className="filters">
            {/* onClick={()=>this.handleClick(this.props.task.id)} */}
            <li>
              <a className ={ this.state.filter == 'all' ? 'selected' : ''} href="#/" onClick={ event => this.filterClick(event, 'all')}>All</a>
            </li>
            <li>
              <a className ={ this.state.filter == 'active' ? 'selected' : ''} href="#/active" onClick={ event => this.filterClick(event, 'active')}>Active</a>
            </li>
            <li>
              <a className ={ this.state.filter == 'completed' ? 'selected' : ''} href="#/completed" onClick={ event => this.filterClick(event, 'completed')}>Completed</a>
            </li>
          </ul>
          {/* <!-- Hidden if no completed items are left ↓ --> */}
          {this.props.tasks.length > 0 ? <button className="clear-completed" onClick={this.handleClick}>Clear completed</button> : ''}
        </footer>
      </>
    )
  }
}

function mapStateToProps (globalState) {
  return { tasks: globalState.tasks }
}

export default connect(mapStateToProps)(TaskList)

// chooseList = () => {
//   const completedTasks = this.props.tasks.filter(task => task.isComplete)
//   const uncompletedTasks = this.props.tasks.filter(task => !task.isComplete)
//   const allTasks = this.props.tasks
//   // eslint-disable-next-line no-unused-vars
//   let displayList
//   if (this.state.listState == 'all') {
//     this.setState({ displayList: allTasks })
//   } else if (this.state.listState == 'completed') {
//     this.setState({ displayList: completedTasks })
//   } else if (this.state.listState == 'active') {
//     this.setState({ displayList: uncompletedTasks })
//   }
//   return this.state.displayList
// }

// Pass a callback into setState because
// it DOES not update state instantaneously
// The callback makes it wait to get the proper
// displayList until AFTER setState is complete
// filterClick = (newState) => {
//   this.setState({
//     listState: newState
// Just chooseList without the ()
// When the () is present, the results
// of chooseList (an array of objects) is returned
//   }, this.chooseList)
// }

{ /* <li class="completed">
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
        </li> */ }
