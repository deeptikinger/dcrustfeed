import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    console.log(state)
    const renderList = () => {
        console.log(state)
        if (state) {
            return [
                <li><Link to="/profile"> Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({ type: "CLEAR" })
                        history.push('/login')
                    }
                    }
                >Logout
            </button>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>,
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white" >
                <Link to={state ? "/" : "/login"} className="brand-logo left">Dcrustfeed</Link>
                <ul id="nav-mobile" className="right ">
                    {renderList()}
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;