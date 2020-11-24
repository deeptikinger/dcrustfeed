import React, { useContext,useRef,useEffect,useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
const Navbar = () => {
    const searchModal=useRef(null)
    const [search ,setSearch]=useState('')
    const [userDetails,setUserDetails]=useState([])
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    
    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])
    const renderList = () => {
        if (state) {
            return [
                <li><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
                <li><Link to="/profile"> Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <li><Link to="/myfollowingpost">My Following Posts</Link></li>,
                <li><button className="btn waves-effect waves-light #ef5350 red lighten-1"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        history.push('/login')
                    }
                    }
                >Logout
            </button>
            </li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>,
            ]
        }
    }
    const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/client/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
        <nav>
        <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">Dcrustfeed</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;