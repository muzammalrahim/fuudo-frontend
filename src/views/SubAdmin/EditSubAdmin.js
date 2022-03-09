import React, { useState, useEffect } from "react";
import {  Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import get,{put} from "../../helper/api"
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation"
import validator from 'validator';
import firebase from '../../firebase/firebase'
import LoaderCard from "components/SharedUI/Loader";
import { toast } from 'react-toastify';

const EditSubAdmin = () => {
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

 
  const onSubmit = async e => {
    e.preventDefault();
    let payload = {
      name: portfolio.name,
      email: portfolio.email,
      role: "subadmin",
    }
    put(`/admin/updateSubAdmin/${id}`, payload).then(res => {
      toast.success(res.data.response)
      history.push("/admin/subAdmin");
    });
    loadPortfolio()
    history.push("/admin/subAdmin");
  };

  const loadPortfolio = async () => {
  isLoading(true)
    get(`/admin/getSubAdmin/${id}`)
    .then((res) => {
      var data = res.data.data
      isLoading(false)
      // alert(res.data.data)
      setPortfolio(data);
    })
    .catch(() => {});
  };
  const { name, email} = portfolio;
  return loading ? (
    <LoaderCard/>
  ) : (
    <div className="container">
      <Link className="btn btn-primary" to="/admin/subAdmin">
        back to Home
      </Link>
      <hr />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A SubAdmin</h2>
        <ValidationForm onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <TextInput
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              id="name"
              required
              successMessage=""
              errorMessage="Please enter your name"
              autoComplete="off"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
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
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">
            Update SubAdmin
          </button>
        </ValidationForm>
      </div>
    </div>
  );
};

export default EditSubAdmin;
