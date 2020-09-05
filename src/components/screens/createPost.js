import React from 'react'

const createPost=()=>{
    return(
        <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input  type="text" placeholder="title"/>
            <input  type="text" placeholder="body"/>
            <div class="file-field input-field">
                <div class="btn #ef5350 red lighten-1">
                    <span>Upload Image</span>
                    <input type="file" multiple/>
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Upload one or more files"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light #ef5350 red lighten-1" >Signup
            </button>
            </div>
    )
}
export default createPost