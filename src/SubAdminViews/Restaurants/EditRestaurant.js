import React, { useState, useEffect } from "react";
import {  Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get,{put} from "../../helper/subAdminApi"

import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";

const EditRestaurant = () => {
  let history = useHistory();
  const { id } = useParams();
  const [imagess, setImagess] = useState([]);
  const[progress , setProgress] = useState(0);
  const[downloadURL , setDownloadURL] = useState(null)
  const [portfolio, setPortfolio] = useState({
    name: "",
    email: "",
    description: "",
    phoneNo: "",
    address: "",
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
      description: portfolio.description,
      phoneNo: portfolio.phoneNo,
      address: portfolio.address,
      role: "restaurantManager",
      image: downloadURL
    }
    put(`/subadmin/updateRestaurant/${id}`, payload).then(res => {
      history.push("/subadmin/restaurants")
    });
    loadPortfolio();
    history.push("/subadmin/restaurants");
  };

  const loadPortfolio = async () => {
  isLoading(true)
    get(`/subadmin/getRestaurant/${id}`)
    .then((res) => {
      var data = res.data.data
      console.log("oops",data)
      isLoading(false)
      // alert(res.data.data)
      setPortfolio(data);
      setDownloadURL(data.image);
    })
    .catch(() => {});
  };
  
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/subadmin/restaurants">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Restaurant</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={portfolio.name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              value={portfolio.email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Description"
              name="description"
              value={portfolio.description}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your PhoneNo"
              name="phoneNo"
              value={portfolio.phoneNo}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Address"
              name="address"
              value={portfolio.address}
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
                      console.log("iameee", e);
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
          <button className="btn btn-warning btn-block">
            Update Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRestaurant;
