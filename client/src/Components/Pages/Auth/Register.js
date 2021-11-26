import { Link, useHistory } from "react-router-dom"
import Axios from 'axios'
import { useForm } from "react-hook-form";

const Register = ({ setIsUserLoggedIn, setUserData }) => {
  let history = useHistory();

  const { register, formState: { errors }, getValues, setError, handleSubmit } = useForm()

  const registerUser = async (data, e) => {
    e.preventDefault()
    try {
      const { username, name, email, password } = data 
      const res = await Axios({
      method: 'post',
      data: {
        username,
        name,
        email,
        password
      },
      url: 'api/auth/register',
      withCredentials: true
      })

      console.log(res.data);
      setUserData({ user: res.data.user, token: res.data.token, expiresIn: res.data.expiresIn })
      setIsUserLoggedIn(true)
      history.push("/")

     } catch (error) {
        if(error.response.status === 400){
          if(error.response.data.errorField === 'username') {
            setError("username", {
              type: "manual",
              message: error.response.data.msg,
            })
          }else if(error.response.data.errorField === 'email') {
            setError("email", {
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
                                        value: /^[a-z][a-zA-Z0-9_][a-zA-Z0-9_]*[a-zA-Z0-9]$/,
                                        message: "Invalid Username"
                                      },
                                      maxLength: {
                                        value: 80,
                                        message: "Maximum length exceeded"
                                      }
                                }

  const emailValidationParams = { required: "Email is required!", 
                                  pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  ,
                                    message: "Invalid Email"
                                  }
                                }

  const cPasswordValidationParams = { required: "Please confirm password!",
                                      validate: {
                                        matchesPreviousPassword: (value) => {
                                          const { password } = getValues();
                                          return password === value || "Passwords should match!";
                                        }
                                      }
                                    }

  return (
    <div className="container mt-5" style={{ width: '30rem' }}>
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" {...register("username", usernameValidationParams)}/>
          { errors.username && ( <p style={{ color: "red" }}> {errors.username.message} </p> ) }
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" id="email" {...register("email", emailValidationParams)}/>
          { errors.email && ( <p style={{ color: "red" }}> {errors.email.message} </p> ) }
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" {...register("name.firstName", { required: "First Name is required!", maxLength: 80 })}/>
          { errors.name?.firstName && ( <p style={{ color: "red" }}> {errors.name?.firstName.message} </p> ) }
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" {...register("name.lastName", { required: "Last is required!", maxLength: 80 })} />
          { errors.name?.lastName && ( <p style={{ color: "red" }}> {errors.name?.lastName.message} </p> ) }
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" {...register("password", { required: "Password is required!" })}/>
          { errors.password && ( <p style={{ color: "red" }}> {errors.password.message} </p> ) }
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cPassword" {...register("cPassword", cPasswordValidationParams )}/>
          { errors.cPassword && ( <p style={{ color: "red" }}> {errors.cPassword.message} </p> ) }
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <h6 className="mt-5">Already have an account?&nbsp;
        <Link to="/">Login Here</Link>
      </h6>
    </div>
  )
}

export default Register
