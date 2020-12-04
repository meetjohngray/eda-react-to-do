import React, { useState } from 'react'
import { baseApiUrl as baseUrl } from '../config'
import { isAuthenticated, register } from 'authenticare/client'
import Header from './Header'
const Register = (props) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    // The [] below allow us to set the key to the e.target variables
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClick = () => {
    const { username, password } = form
    register({ username, password }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2>Register</h2>
      <form>
        <label htmlFor='username'>Username:</label>
        <input type='text'
          id='username'
          name='username'
          value={form.username}
          onChange={handleChange} />

        <label htmlFor='password'>Password:</label>
        <input type='password'
          id='password'
          name='password'
          value={form.password}
          onChange={handleChange} />
        <button type='button' onClick={handleClick}>Register</button>
      </form>
      <Header />
    </>
  )
}

export default Register
