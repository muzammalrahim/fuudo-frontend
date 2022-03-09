import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {post} from "../../helper/api"
import UploadImages from './UploadImages'
import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import validator from 'validator';
import { toast } from 'react-toastify';

export default function AddSubadmin () {
  let history = useHistory();
  const [loading, isLoading] = useState(true)
  const [service, setService] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, email, password, confirmPassword} = service;
  const onInputChange = e => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const matchPassword = (value) => {
    return value && value === password;   
  }

  useEffect(() => {
    setTimeout(() => isLoading(false), 2000)
  })
    
  const onSubmit = async e => {
    e.preventDefault();
    try {
      let payload = {
        name: service.name,
        email: service.email,
        password: service.password,
        role: "subadmin", 
      }
      const apiRes = await post("/admin/createSubAdmin", payload);
      if (apiRes.status === 201) {
        toast.success(apiRes.data.response)
        // swal({
        //   title: "Success",
        //   text: apiRes.data.response,
        //   icon: "success",
        //   button: "OK!",
        // })
        setService(apiRes.data.data);
        history.push("/admin/subAdmin");
      }
    } catch (err) {
      console.log(err);
      history.push("/admin/subAdmin");
    }
  }
  
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/admin/subAdmin">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A SubAdmin</h2>
        <ValidationForm onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <TextInput
              type= "text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              id="name"
              required
              successMessage=""
              errorMessage="Please enter your name"
              autoComplete="off"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <TextInput
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              id="email"
              type="email"
              required
              successMessage=""
              errorMessage="Please enter your email address"
              autoComplete="off"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Password"
              name="password"
              id="password"
              pattern="(?=.*[a-z]).{6,}"
              successMessage=""
              required
              errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters"}}
              autoComplete="off"
              value={password}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          {/* <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your confirm Password"
              name="confirmPassword"
              validator={(value) => matchPassword(value)}
              id="confirmPassword"
              pattern="(?=.*[a-z]).{6,}"
              successMessage=""
              required
              errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
              autoComplete="off"
              value={confirmPassword}
              onChange={e => onInputChange(e)}
            />
          </div> */}
          <button
            type='submit' className="btn btn-primary btn-block">Add SubAdmin</button>
        </ValidationForm>
      </div>
    </div>
  );
}

