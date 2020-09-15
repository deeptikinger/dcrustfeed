import React ,{useEffect}from 'react'

const Profile = () => {
  useEffect(()=>{
    fetch('/mypost',{
      headers:{
        "Authorization":"Bearer"+localStorage.getItem("jwt")
      }
    })
    .then(res=>{res.json()})
    .then(result=>{
      
    })
  },[])
    return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }} >
        
          <div>
            <img  style={{width:"160px",height:"160px",borderRadius:"80px"}}
            src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            />
            </div>
          <div> 
            <h4>Himanshi Deepti</h4>
            <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
            <h6>40 posts</h6>
            <h6>40 following</h6>
            <h6>40 followers</h6>
            </div>
        </div>
       </div>
     <div className="gallery">
     <img className="item" src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>  
     <img className="item"src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
     <img className="item"src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
     <img className="item"src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
     <img className="item"src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
     <img className="item"src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
     </div>
     </div>  
    )
}

export default Profile;