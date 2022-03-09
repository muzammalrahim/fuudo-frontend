import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { post } from "../../helper/subAdminApi";
import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"

export default function AddRestaurant () {
  let history = useHistory();
  const [loading, isLoading] = useState(true);
  const[imagess,setImagess]=useState([])
  const[progress , setProgress] = useState(0);
  const[downloadURL , setDownloadURL] = useState(null)
  const [restaurant, setRestaurant] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    description: "",
    phoneNo: "",
    address: "",    
  });

  const { name, email, password, confirmPassword, image, description, phoneNo, address} = restaurant;
  const onInputChange = e => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const matchPassword = (value) => {
    return value && value === password;   
  }

  useEffect(() => {
    setTimeout(() => {
      isLoading(false)
    }, 2000);
  }, [])


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
    let payload = {
      name: restaurant.name,
      email: restaurant.email,
      password: restaurant.password,
      description: restaurant.description,
      phoneNo: restaurant.phoneNo,
      address: restaurant.address,
      role: "restaurantManager",
      image: downloadURL
    }
   
    await post("/subadmin/createRestaurant", payload)
    .then((res) => {
      var data = res.data.data
      console.log("data", data);
      setRestaurant(data);
      history.push("/subadmin/restaurants");
    })
    .catch(() => {});
    history.replace("/subadmin/restaurants");
 
  }
  
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/subadmin/restaurants">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Restaurant Profile</h2>
        <ValidationForm onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <TextInput
              type="text"
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
              successMessage=""
              required
              pattern="(?=.*[a-z]).{6,}"
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

            <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Description"
              name="description"
              id="description"
              successMessage=""
              required
              errorMessage="Please enter your description"
              autoComplete="off"
              value={description}
              onChange={e => onInputChange(e)}
            />
            </div>

            <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone No"
              name="phoneNo"
              id="phoneNo"
              successMessage=""
              required
              errorMessage="Please enter your phoneNo"
              autoComplete="off"
              value={phoneNo}
              onChange={e => onInputChange(e)}
            />
            </div>
            <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="address"
              id="address"
              successMessage=""
              required
              errorMessage="Please enter your address"
              autoComplete="off"
              value={address}
              onChange={e => onInputChange(e)}
            />
            </div>
         
          <div>
              <div className="card-header">
                Multiple Image Upload Preview
              </div>
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
                    className="btn btn-success btn-sm ml-5"
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
          <button type='submit' className="btn btn-primary btn-block">Add Restaurant Profile</button>
        </ValidationForm>
      </div>
    </div>
  );
}