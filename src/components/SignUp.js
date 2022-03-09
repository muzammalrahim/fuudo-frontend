import React, {useEffect, useState} from 'react';
import Login from './Login';
import { post } from 'helper/subAdminApi';
import { useHistory } from 'react-router-dom';
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import swal from 'sweetalert';
import LoaderCard from './SharedUI/Loader';

const SignUp = () => {
    let history = useHistory();
    const [show, isShow] = useState(true)
    const [register, setRegister] = useState("")
    const [signUp, setSignUp] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        history.push("/")
    }, [])

    const handleRegister = () => {
        setRegister("user register successfully")
    }

    const { name, email, password } = signUp;
    const onInputChange = e => {
        setSignUp({ ...signUp, [e.target.name]: e.target.value });
    };
    const handleShowCard = () => {
        isShow(false)
    };

    const onSubmit = async e => {
        e.preventDefault()
        await post("/auth/signup",{name: signUp.name, email:signUp.email, password:signUp.password})
        .then((res) => {
            console.log(res);
        if (res.status === 401) {
            swal({
                title: "Success",
                text: res.data.response,
                icon: "success",
                button: "OK!",
            })
            setSignUp(res.data);
        }
        else if (res.status === 406) {
            swal({
                title: "Success",
                text: res.data.response,
                icon: "success",
                button: "OK!",
            })
        }
        //   if (data.user.role === "admin") {
        //     setAuthorizationToken(data.token)
        //     history.push("/admin");
        //   }
        //   else if (data.user.role === "subadmin") {
        //     setSubAdminAuthorizationToken(data.token)
        //     history.push("/subadmin");
        //   } else if (data.user.role === "restaurantManager") {
        //     history.push("/restaurant")
        //   }
        })
        .catch(() => {history.push('/')});
    }
    return  (
        show ? (
            <div class="signup-form">
        <ValidationForm onSubmit={e => onSubmit(e)}>
		<h2>Register</h2>
		<p class="hint-text">Create your account. It's free and only takes a minute.</p>
        <div class="form-group">
			<TextInput required errorMessage="Please enter your name" type="text" name="name" onChange={e => onInputChange(e)} value={name} class="form-control" name="name" placeholder="Enter your Name"/>
        </div>
        <div class="form-group">
        	<TextInput required errorMessage="Please enter your email" type="email" name="email" onChange={e => onInputChange(e)} value={email} class="form-control" name="email" placeholder="Enter your Email"/>
        </div>
		<div class="form-group">
            <TextInput required errorMessage="Please enter your password" type="password" name="password" onChange={e => onInputChange(e)} value={password} class="form-control" name="password" placeholder="Enter your Password"/>
        </div>
        <div class="form-group">
            <button onClick={handleRegister} type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
        </div>
    </ValidationForm>
	<div class="text-center text-red">Already have an account? <button onClick={handleShowCard}>Sign in</button></div>
</div>
        ): <Login/>
    )
}

export default SignUp