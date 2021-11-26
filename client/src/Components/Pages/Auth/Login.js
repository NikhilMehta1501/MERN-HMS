import { Link, useHistory } from "react-router-dom"
import {useForm} from "react-hook-form"
import Axios from "axios"

const Login = ({ setUserData, setIsUserLoggedIn }) => {
  let history = useHistory();

  const { register, formState: { errors }, setError, handleSubmit } = useForm()

  const loginUser = async (data, e) => {
    e.preventDefault()
    try {
      const { username, password } = data 
      const res = await Axios({
      method: 'post',
      data: {
        username,
        password
      },
      url: 'api/auth/login',
      withCredentials: true
      })

      setUserData({ user: res.data.user, token: res.data.token, expiresIn: res.data.expiresIn })
      setIsUserLoggedIn(true)
      history.push("/")

     }catch (error) {
        console.log(error);
        if(error.response.status === 400){
          if(error.response.data.errorField === 'username') {
            setError("username", {
              type: "manual",
              message: error.response.data.msg,
            })
          }else if(error.response.data.errorField === 'password') {
            setError("password", {
              type: "manual",
              message: error.response.data.msg,
            })
          }else {
            console.log(error.response);
          }
        }
      }
  }

  const usernameValidationParams = { required: "Username is required!", 
                                      pattern: {
                                        value: /^[a-z][a-zA-Z0-9_][a-zA-Z0-9_]*[a-zA-Z]$/,
                                        message: "Invalid Username"
                                      },
                                      maxLength: {
                                        value: 80,
                                        message: "Maximum length exceeded"
                                      }
                                  }

  return (
    <div className="container mt-5" style={{ width: '30rem' }}>
      <form onSubmit={handleSubmit(loginUser)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" {...register("username", usernameValidationParams)}/>
          { errors.username && ( <p style={{ color: "red" }}> {errors.username.message} </p> ) }
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" {...register("password", { required: "Password is required!" })}/>
          { errors.password && ( <p style={{ color: "red" }}> {errors.password.message} </p> ) }
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <h6 className="mt-5">Don't have an account?&nbsp;
        <Link to="/register">Register Here</Link>
      </h6>
    </div>
  )
}

export default Login
