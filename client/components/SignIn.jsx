import React, { useState } from 'react'
import { baseApiUrl as baseUrl } from '../config'
import { isAuthenticated, signIn } from 'authenticare/client'

const SignIn = (props) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClick = () => {
    const { username, password } = form
    signIn({ username, password }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
  }

  return (
    <>
      <h2>Sign in</h2>
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

        <button type='button' onClick={handleClick}>Sign in</button>
      </form>
    </>
  )
}

export default SignIn