function Login(params) {
  return (
    <div>
      <div>This is the login page</div>
      <form action="http://localhost:3001/auth/google" method="GET">
        <button type="submit"> GOOGLE BUTTON </button>
      </form>
    </div>
  )
}

export default Login;