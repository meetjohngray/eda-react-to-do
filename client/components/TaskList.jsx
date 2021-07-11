import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import { apiDeleteTask, getAllTasks } from '../apis/index'
import { initTask, deleteTask } from '../actions/index'

const TaskList = (props) => {
  // state = {
  //   filter: 'all',
  //   authenticated: false
  // }

  const [TaskList, setTaskList] = useState({
    filter: 'all',
    authenticated: false
  })

  // componentDidMount () {
  //   getAllTasks()
  //     // eslint-disable-next-line promise/always-return
  //     .then(task => {
  //       this.props.dispatch(initTask(task))
  //     })
  //     .catch(err => console.log(err))
  // }

  useEffect(() => {
    getAllTasks()
    // eslint-disable-next-line promise/always-return
      .then(task => {
        props.dispatch(initTask(task))
      })
      .catch(err => console.log(err))
  }, [])

  const handleClick = () => {
    // I grab the props tasks, then itererate through each individual task
    props.tasks.forEach(task => {
      if (task.isComplete) {
        apiDeleteTask(task.id)
          // eslint-disable-next-line promise/always-return
          .then(() => {
            props.dispatch(deleteTask(task.id))
            setTaskList({
              ...TaskList, filter: 'active'
            })
          })
          .catch(err => console.log(err))
      }
    })
  }

  const filterClick = (event, filter) => {
    event.preventDefault()
    setTaskList({
      ...TaskList, filter: filter
    })
  }

  return (
    <>
      <section className="main">

        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {/* <!-- These are here just to show the structure of the list items --> */}
          {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}

          {props.tasks.filter(task => {
            switch (TaskList.filter) {
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
        <span className="todo-count"><strong>{props.tasks.length}</strong> item left</span>
        {/* <!-- Remove this if you don't implement routing --> */}
        <ul className="filters">
          {/* onClick={()=>this.handleClick(this.props.task.id)} */}
          <li>
            <a className ={ TaskList.filter === 'all' ? 'selected' : ''} href="#/" onClick={ event => filterClick(event, 'all')}>All</a>
          </li>
          <li>
            <a className ={ TaskList.filter === 'active' ? 'selected' : ''} href="#/active" onClick={ event => filterClick(event, 'active')}>Active</a>
          </li>
          <li>
            <a className ={ TaskList.filter === 'completed' ? 'selected' : ''} href="#/completed" onClick={ event => filterClick(event, 'completed')}>Completed</a>
          </li>
        </ul>
        {/* <!-- Hidden if no completed items are left ↓ --> */}
        {props.tasks.length > 0 ? <button className="clear-completed" onClick={handleClick}>Clear completed</button> : ''}
      </footer>
    </>
  )
}

function mapStateToProps (globalState) {
  return { tasks: globalState.tasks }
}

export default connect(mapStateToProps)(TaskList)
