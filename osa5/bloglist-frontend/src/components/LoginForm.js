import React from 'react'
/*
const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
*/

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => (     
    <div clas="loginform">
      <h2> Login </h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" value={username} name="Username" onChange={handleUsernameChange}/>
        </div>
        <div>password
          <input type="password" value={password} name="Password" onChange={handlePasswordChange}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

export default LoginForm
