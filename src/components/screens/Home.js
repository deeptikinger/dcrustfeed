import React from 'react'

const Home = () => {
    return (
        <div className="home">
           <div className="card home-card">
               <h5>Name of user</h5>
               <div className="card-image">
                   <img src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
              </div>
              <div className="card-content">
              <i className="material-icons" style={{color:"red"}}>favorite</i>
                  <h6>title of post</h6>
                  <p>this is amazing post</p>
                  <input type="text" placeholder="addComment"/>
              </div>
           </div>
           <div className="card home-card">
               <h5>Name of user</h5>
               <div className="card-image">
                   <img src="https://images.unsplash.com/photo-1598900563415-bac8177664aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
              </div>
              <div className="card-content">
              <i className="material-icons" style={{color:"red"}}>favorite</i>
                  <h6>title of post</h6>
                  <p>this is amazing post</p>
                  <input type="text" placeholder="addComment"/>
              </div>
           </div>
        </div>
    )
}

export default Home;