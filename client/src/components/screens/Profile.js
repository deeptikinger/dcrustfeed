import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
  const [mypics, setPics] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [image,setImage] = useState("");
    const [url,setUrl] = useState("");

  console.log(state)
  useEffect(() => {
    fetch('http://localhost:5000/post/mypost', {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(result => {

        setPics(result.mypost)
      })
  }, [])

    
    useEffect(()=>{
      if(image){
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
                
                // localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                // dispatch({type:"UPDATEPIC",payload:data.url})
                fetch('http://localhost:5000/client/updatepic',{
                  method:"put",
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                  },
                  body:JSON.stringify({
                    pic:data.url
                  })
                }).then(res=>res.json())
                .then(result=>{
                  console.log(result)
                  localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})
                })
            })
            .catch(err => {
                console.log(err)
            })
      }
    },[image])
  const  updatePhoto = (file) =>{
    setImage(file)}

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div style={{
        margin: "18px 0px",
        borderBottom: "1px solid grey"
      }}>
      <div style={{
        display: "flex",
        justifyContent: "space-around", 
      }} >

        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state?state.pic:"loading"}
          />
           
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
            <h6>40 posts</h6>
            <h6>40 following</h6>
            <h6>40 followers</h6>
          </div>
        </div>
      </div>
       <button className="btn waves-effect waves-light #ef5350 red lighten-1"
              style={{margin:"10px 0px 10px 52px"}}  
              onclick={()=>{
               updatePhoto();
              }}   
                >Upload Pic
                </button>
                  <div className="file-field input-field" style={{margin:"10px"}}>
                <div className="btn #ef5350 red lighten-1">
                    <span>Update Profile Photo</span>
                    <input type="file" multiple onChange={(e) => updatePhoto(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                </div>
            </div>

      </div>
      <div className="gallery">
        {
          mypics.map(item => {
            return (
              <img key={item._id} className="item" src={item.photo} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Profile;