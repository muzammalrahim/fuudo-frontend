import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import get,{ post} from "../../helper/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "ckeditor4-react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";
import { ValidationForm, TextInput, SelectGroup, FileInput} from "react-bootstrap4-form-validation"

export default function AddDeal() {
  let history = useHistory();
  const [loading, isLoading] = useState(true);
  const [imagess, setImagess] = useState([]);
  
  const[progress , setProgress] = useState(0);
  
  const[downloadURL , setDownloadURL] = useState(null)
    
  const [restaurant, setRestaurant] = useState([]);
  const [selectRestaurant, setSelectRestaurant] = useState();
  const [deal, setDeal] = useState({
      name: "",
      originalPrice: "",
      discountPrice: "",
      description: "",
      image: "",
      restaurantId: ""
    }
  );
  
  
  const { name, originalPrice, discountPrice, description, image, restaurantId } = deal;
  const onInputChange = (e) => {
    setDeal({ ...deal, [e.target.name]: e.target.value });
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setDeal({...deal, description: data})
  }

  // const onEditorChange = (evt) => {
  //   const data = evt.editor.getData()
  //   setdeal( {...deal, description: data});
  // }

  const textChange = (changeEvent) => {
    setDeal( {...deal, description: changeEvent.target.value} );
  }

  useEffect(() => {
    restaurants();
    setTimeout(() => isLoading(false), 2000)
  },[]);

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

  const restaurants = async () => {
    get("/admin/getRestaurantsDropdown")
   .then((res) => {
     var data = res.data.data
     console.log("Another Data", data)
     setRestaurant(data)
   })
   .catch(() => {});   
 };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        name: deal.name,
        originalPrice: deal.originalPrice,
        discountPrice: deal.discountPrice,
        description: deal.description,
        restaurantId: selectRestaurant, image: downloadURL
      }
      const apiRes = await post("/admin/createDeals", payload)
      console.log(apiRes);
      setDeal(apiRes.data.data);
      history.push("/admin/deals");
    } catch (err) {
      console.log(err);
      history.push("/admin/deals");
    }
  };

  return loading ? (
    <LoaderCard/> ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/admin/deals">
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
              className="browser-default custom-select custom-select-lg" 
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
                        }  onChange={(e)=>{
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
