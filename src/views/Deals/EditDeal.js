import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get, { put } from "../../helper/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LoaderCard from "components/SharedUI/Loader";
import firebase from '../../firebase/firebase'

const EditDeal = () => {
  let history = useHistory();
  const { id } = useParams();
  const [imagess, setImagess] = useState([]);
  const[progress , setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [deal, setDeal] = useState({
    name: "",
    originalPrice: "",
    discountPrice: "",
    description: "",
  });
  const [loading, isLoading] = useState(false);
  const { name, originalPrice, discountPrice, description, image} = deal;
  const onInputChange = (e) => {
    setDeal({ ...deal, [e.target.name]: e.target.value });
  };

  const handleChange = (e, editor) => {
    const data = editor.getData();
    console.log("editing data", data);
    setDeal({ ...deal, description: data })
  }

  useEffect(() => {
    loadDeals();
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
 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        name: deal.name,
        originalPrice: deal.originalPrice,
        discountPrice: deal.discountPrice,
        description: deal.description,
        image: downloadURL
      }
      await put(`/admin/updateDeal/${id}`, payload);
      history.push("/admin/deals")
      loadDeals();
    } catch (err) {
      console.log(err);
      history.push("/admin/deals");
    }
  };

  const loadDeals = async () => {
    isLoading(true);
    try {
      const res = await get(`/admin/getDeal/${id}`)
      isLoading(false);
      console.log("editor data", res.data.data);
      setDeal(res.data.data);
      setDownloadURL(res.data.data.image);
    } catch (err) {
      console.log(err);
    }
  };
  
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/admin/deals">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Deal</h2>
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
              placeholder="Enter Your Original price"
              name="originalPrice"
              value={originalPrice}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Discount price"
              name="discountPrice"
              value={discountPrice}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <CKEditor
              data={description}
              onReady={ editor => {
                if (description) {
                  editor?.setData(description);
                }
            } }
              editor={ClassicEditor}
              onChange={(e, editor) => handleChange(e, editor)}
              />
            <br/>
          </div>

          <div className="card-body">
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
              <br />
            </div>
            <img
              className="ref"
              src={downloadURL || "https://via.placeholder.com/400x300"}
              alt="Uploaded Images"
              height="300"
              width="400"
            />
            <br />
          </div>
          <button className="btn btn-warning btn-block">
            Update Deal
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDeal;
