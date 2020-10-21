import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M, { toast } from 'materialize-css'
import { UserContext } from '../../App'
const ResetPassword = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")

    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }

        fetch("/user/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/user/login')
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
                <button className="btn waves-effect waves-light #ef5350 red lighten-1"
                    onClick={() => PostData()}
                > Reset password
                </button>

            </div>
        </div>
    );
}

export default ResetPassword;