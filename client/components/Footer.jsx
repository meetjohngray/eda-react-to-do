import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <footer className="info">
       <p>Double-click to edit a todo</p>
       <p>Created by <a href="https://meetjohngray.com">you</a></p>
       <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
     </footer>
    )
  }
}

export default Footer