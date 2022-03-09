import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { post } from "../../helper/api"
import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import validator from 'validator';

export default function AddUser () {
  let history = useHistory();
  const[imagess,setImagess]=useState([])
  const [progress, setProgress] = useState(0);
  const [loading, isLoading] = useState(true)
  const[downloadURL , setDownloadURL] = useState(null)
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, email,password, confirmPassword} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const matchPassword = (value) => {
    return value && value === password;   
  }

  useEffect(() => {
    setTimeout(() => isLoading(false), 3000)
  })

  const handleUpload = (e) => {
    e.preventDefault()
    let file = imagess;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child('images/' + file.name).put(file);
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
        setProgress(progress)
      },(error) =>{
        throw error
      },() =>{
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
  
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          setDownloadURL(url)
        })
      document.getElementById("file").value = null
  
     }
   ) 
   
  }
    
  const onSubmit = async e => {
    e.preventDefault();
    try {
      let payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: "user",
        image: downloadURL
      }
      const apiRes = await post("/admin/createUser", payload);
      console.log(apiRes);
      setService(apiRes.data.data);
      history.push("/admin/users");
    } catch (err) {
      console.log(err);
      history.push("/admin/users");
    }
  }
  
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/admin/users">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add a User</h2>
        <ValidationForm onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your name"
              name="name"
              id="name"
              required
              successMessage=""
              autoComplete="off"
              errorMessage="Please enter your name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <TextInput
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your email"
              name="email"
              id="email"
              required
              successMessage=""
              autoComplete="off"
              errorMessage="Please enter your email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <TextInput
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              name="password"
              id="password"
              pattern="(?=.*[a-z]).{6,}"
              required
              successMessage=""
              autoComplete="off"
              errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters"}}
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
          
          <div>
              
              <div className="card-body">

              <div className='row'>
                <div className='col-9'><input type="file" id="file" onChange={(e)=>{
                if(e.nativeEvent.target.files[0]){

                 setImagess(e.nativeEvent.target.files[0])
                  
                }

              }}  />
                {progress}
              </div>
                <div className='col-3'>
                <button
                        className="btn btn-success btn-sm ml-5 "

                        
                        onClick={(e)=>handleUpload(e)}
                      >
                        Upload
                      </button>
                </div>

              </div>
                
                           <img
          className="ref"
          src={downloadURL || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
              </div>
            </div>
          <button type='submit' className="btn btn-primary btn-block">Add User</button>
        </ValidationForm>
      </div>
    </div>
  );
}

