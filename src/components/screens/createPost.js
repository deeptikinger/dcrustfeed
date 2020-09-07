import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M, { toast } from 'materialize-css'
const createPost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (url) {
            fetch("http://localhost:5000/user/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message) {
                        M.toast({ html: data.message, classes: "#c62828 red darken-3" })
                    } else {
                        M.toast({ html: "Created post Successfully", classes: "#43a047 green darken-1" })
                        history.push('/')
                    }
                })
                .catch(err => {
                    M.toast({ html: err })
                })
        }
    }, [url])

    const postDetails = () => {
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
    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}>
            <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
            <div class="file-field input-field">
                <div class="btn #ef5350 red lighten-1">
                    <span>Upload Image</span>
                    <input type="file" multiple onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Upload one or more files" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                onClick={() => postDetails()}
            >Submit post
            </button>
        </div>
    )
}
export default createPost