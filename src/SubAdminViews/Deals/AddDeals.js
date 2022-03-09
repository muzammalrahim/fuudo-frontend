import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import get,{ post} from "../../helper/subAdminApi";
import UploadImages from "./UploadImages";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";
import { ValidationForm, TextInput, SelectGroup, FileInput} from "react-bootstrap4-form-validation"

export default function AddProject() {
  let history = useHistory();
  const [loading, isLoading] = useState(true)
  const [imagess, setImagess] = useState([]);
  
  const [image2, setImage2] = useState([]);
  const[progress , setProgress] = useState(0);
  
  const[progress2 , setProgress2] = useState(0);
  const[downloadURL , setDownloadURL] = useState(null)
  
  const [downloadURL2, setDownloadURL2] = useState(null)
  
  const [restaurant, setRestaurant] = useState([]);
  const [selectRestaurant, setSelectRestaurant] = useState();

  const [user, setUser] = useState({
      name: "",
      originalPrice: "",
      discountPrice: "",
      description: "",
      image: "",
      restaurantId: ""
    }
  );
  
  const { name, originalPrice, discountPrice, description, image, restaurantId } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setUser({...user, description: data})
  }

  useEffect(() => {
    restaurants();
    setTimeout(() => {
      isLoading(false)
    }, 2000);
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

  const restaurants =() => {
    get("/subadmin/getRestaurantsDropdown")
   .then((res) => {
     var data = res.data?.data
     console.log("Another Data", data)
     console.log("data",data)
     setRestaurant(data);
   })
   .catch(() => {});   
 };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    post("/subadmin/createDeals",{name:user.name, originalPrice:user.originalPrice,discountPrice:user.discountPrice, description:user.description, restaurantId: selectRestaurant, image:downloadURL , image2:downloadURL2})
    .then((res) => {
      var data = res.data.data
      console.log("deal", data);
      setUser(data);
      history.push("/subadmin/deals");
    })
    .catch(() => {});
    history.replace("/subadmin/deals");

  };

  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/subadmin/deals">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Deals</h2>
        <ValidationForm onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Deal"
              name="name"
              id="name"
              required
              successMessage=""
              errorMessage="Please enter your name"
              autoComplete="off"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your original price"
              name="originalPrice"
              id="originalPrice"
              required
              successMessage=""
              errorMessage="Please enter your originalPrice"
              autoComplete="off"
              value={originalPrice}
              onChange={(e) => onInputChange(e)}
            />
          </div>
        
          <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your discount price"
              name="discountPrice"
              id="discountPrice"
              required
              successMessage=""
              errorMessage="Please enter your discountPrice"
              autoComplete="off"
              value={discountPrice}
              onChange={(e) => onInputChange(e)}
            />
          </div>
 
          <div className="form-group">
            <CKEditor
              data = {description}
              editor={ClassicEditor}
              onChange={(e, editor) => handleChange(e, editor)}
            />
          </div>
                  
          <div className="form-group">
          {/* <div>Selected Restaurant: {selectRestaurant}</div> */}
              <SelectGroup
                required 
                errorMessage="Please select a restaurant" 
                id="restaurant" 
                name="restaurant"
                class="browser-default custom-select custom-select-lg"
                onChange={e => setSelectRestaurant(e.target.value)}>
                <option value="">Select Restaurant</option>
              {restaurant.map(restaurant => (
                <option value={restaurant?._id}>{restaurant?.name}</option>
              ))}
            </SelectGroup>
          </div>

          {/* <div> */}
            <div className="card-body">
             
            <div className='row'>
                <div className='col-9'><FileInput type="file" id="file" required successMessage="" errorMessage={
                            { required: "Please upload a file", 
                              maxFileSize: "Max file size is 150 kb"
                            }
                        } onChange={(e)=>{
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
                <br/>
              </div>
              
          <img
          className="ref"
          src={downloadURL || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
        <br/>
            </div>
          <button type='submit' className="btn btn-primary btn-block">Add Deal</button>
        </ValidationForm>
      </div>
    </div>
  );
}
