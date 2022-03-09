import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { post } from "../helper/api"
import { setAuthorizationToken, setSubAdminAuthorizationToken } from "helper/setAuthorizationToken";
import LoaderCard from "./SharedUI/Loader";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import SignUp from "./SignUp";
import swal from 'sweetalert';

const Login = () => {
  let history = useHistory();
  const [loading, isLoading] = useState(false)
  const [show, isShow] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [login, setLogin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword} = login;
  const onInputChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleShowCard = () => {
    isShow(false)
  };

  const handleShowPassword = () => {
      setShowPassword(!showPassword);
  };

  const matchPassword = (value) => {
    return value && value === password;
  }

  const onSubmit = async e => {
    e.preventDefault()
    isLoading(true);
    await post("/auth/login",{email:login.email, password:login.password})
    .then((res) => {
      var data = res.data
      isLoading(false);
      setLogin(data);
      if (data.user.role === "admin") {
        setAuthorizationToken(data.token)
        history.push("/admin");
      }
      else if (data.user.role === "subadmin") {
        setSubAdminAuthorizationToken(data.token)
        history.push("/subadmin");
      } else if (data.user.role === "restaurantManager") {
        history.push("/restaurant")
      }
    })
    .catch(() => {});
  }
    return loading ? (
      <LoaderCard/>
    ) : (
        show ? (
          <section class="h-100 gradient-form" style={{ "backgroundColor": "#eee" }}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                <div class="text-center">
                                            <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png" style={{ "width": "185px"}} alt="logo"/>
                  <h4 class="mt-1 mb-5 pb-1">We are The Food Delivery Team</h4>
                </div>

                <ValidationForm onSubmit={e => onSubmit(e)}>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                    <TextInput
                      name="email"
                      value={email}
                      onChange={e => onInputChange(e)}
                      type="email" id="form2Example11"
                      class="form-control"
                      placeholder="Please enter your email"
                      required
                      successMessage=""
                      autoComplete="off"
                      errorMessage="Please enter your email"
                      />
                    {/* <label class="form-label" for="form2Example11">Username</label> */}
                  </div>

                  <div class="form-outline mb-4">
                    <TextInput
                      name="password"
                      value={password}
                      onChange={e => onInputChange(e)}
                      type={showPassword ? 'text': 'password'}
                      placeholder="Please enter password"
                      id="form2Example22"
                      pattern="(?=.*[a-z]).{6,}"
                      required
                      successMessage=""
                      autoComplete="off"
                      errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters"}}
                      class="form-control"
                    />
                    {/* <br/> */}
                    {/* <div class="form-group form-check">
                      <input onClick={handleShowPassword} type="checkbox" class="form-check-input" id="exampleCheck1"/>
                      <label class="form-check-label" for="exampleCheck1">Show Password</label>
                    </div> */}
                    {/* <span
                      className="password-show-icon"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? (
                        <i className="fas fa-eye"></i>
                      ) : (
                        <i className="fas fa-eye-slash"></i>
                      )}
                    </span> */}
                    
                      {/* <input onClick={handleShowPassword} class="form-check-input" type="checkbox" id="check1" name="option1" value="something"/>Show Password */}
                    {/* <button onClick={togglePassword}>Show Password</button> */}
                    {/* <label class="form-label" for="form2Example22">Password</label> */}
                  </div>
                  
                  <div class="form-outline mb-4">
                    <TextInput
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={e => onInputChange(e)}
                      type={showPassword ? 'text': 'password'}
                      placeholder="Please enter confirm password"
                      id="form2Example23"
                      pattern="(?=.*[a-z]).{6,}"
                      validator={(value) => matchPassword(value)}
                      required
                      successMessage=""
                      autoComplete="off"
                      errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                      class="form-control"
                    />
                            {/* <label className="form-label" for="form2Example22">Confirm Password</label> */}
                  </div>
                  <input onClick={handleShowPassword} type="checkbox" id="showPassword"/>
                    <label for="showPassword" className="pl-2">Show password</label>
                  <div class="text-center pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log in</button>
                    <a class="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button onClick={handleShowCard} type="button" class="btn btn-outline-danger">Create new</button>
                  </div>

                </ValidationForm>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">We are more than just a food delivery</h4>
                <p class="small mb-0">A restaurant (sometimes known as a diner) is a place where cooked food is sold to the public, and where people sit down to eat it. It is also a place where people go to enjoy the time and to eat a meal. Some restaurants are a chain, meaning that there are restaurants which have the same name and serve the same food.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        ): <SignUp/>
    )
}

export default Login