import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M, { toast } from 'materialize-css'
import { UserContext } from '../../App'
const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("http://localhost:5000/user/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    M.toast({ html: data.message, classes: "#c62828 red darken-3" })
                } else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))

                    M.toast({ html: "Successfully SignedIn", classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            })
            .catch(err => {
                M.toast({ html: err })
            })
    }
    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>DCRUSTFEED</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                    onClick={() => PostData()}
                >Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Login;