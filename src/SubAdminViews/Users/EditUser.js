import React, { useState, useEffect } from "react";
import {  useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get, { put } from "../../helper/subAdminApi";

import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [imagess, setImagess] = useState([]);
  const[progress , setProgress] = useState(0);
  const[downloadURL , setDownloadURL] = useState(null)
  const [portfolio, setPortfolio] = useState({
    name: "",
    email: "",   
  });
const [loading,isLoading]=useState(false)
  
  const onInputChange = e => {
    setPortfolio({ ...portfolio, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadPortfolio();
  }, []);


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
      name: portfolio.name,
      email: portfolio.email,
      role: "user",
      image: downloadURL
    }
    put(`/subadmin/updateUser/${id}`, payload).then(res => {
      history.push("/subadmin/users")
    });
    loadPortfolio()
    history.push("/subadmin/users");
  };

  const loadPortfolio =  () => {
  isLoading(true)
    get(`/subadmin/getUser/${id}`)
    .then((res) => {
      var data = res.data.data
      isLoading(false)
      // alert(res.data.data)
      setPortfolio(data);
      setDownloadURL(data.image);
    })
    .catch(() => {});
  };
  const { name, email , image} = portfolio;
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/subadmin/users">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit a User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Username"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          
          <div className="card-body">
            <img
              className="ref"
              src={downloadURL || "https://via.placeholder.com/400x300"}
              alt="Uploaded Images"
              height="300"
              width="400"
            />
            <div className="row">
              <div className="col-9">
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    if (e.nativeEvent.target.files[0]) {
                      setImagess(e.nativeEvent.target.files[0]);
                    }
                  }}
                />
                {progress}
              </div>
              <div className="col-3">
                <button
                  className="btn btn-success btn-sm ml-5 "
                  onClick={(e) => handleUpload(e)}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
