import React, { useState,useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M, { toast } from 'materialize-css'
const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image,setImage] = useState("");
    const [url,setUrl] = useState(undefined);

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = () => {
         const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "dcrustFeed")
        data.append("cloud_name", "dwf4l1tyy")
        fetch("https://api.cloudinary.com/v1_1/dwf4l1tyy/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const uploadFields = () => {
        //  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        //     M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
        //     return
        // }
        // "^[a-zA-Z0-9_.+-]+@[dcrust]+\.[org]+$"
        if (!/[a-zA-Z0-9_.+-]+@[dcrustm]+\.[org]+$/.test(email)) {
            M.toast({ html: "Only dcrust users are allowed to access", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/user/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/login')
                }
            })
            .catch(err => {
                M.toast({ html: err })
            })
    }
    const PostData = () => {

        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>DCRUSTFEED</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                 <div className="file-field input-field">
                <div className="btn #ef5350 red lighten-1">
                    <span>Upload Profile Photo</span>
                    <input type="file" multiple onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                </div>
            </div>

                <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                    onClick={() => PostData()}
                >Signup
                </button>
                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Signup;