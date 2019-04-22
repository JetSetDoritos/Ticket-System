import React, {Component} from 'react';
import firebase from "firebase";
import { Toaster, Intent } from '@blueprintjs/core'
import { Redirect } from 'react-router-dom'
import app from '../base'

//                <button style={{width: "100%"}} className="pt-button pt-intent-primary"
//onClick={()=> {this.authWithUsername()}}>Login with Username</button>

  // Initialize Firebase



  //const app = firebase.initializeApp(config);

class Login extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            redirect: false
        }
    }



    authWithEmailPassword(event) {
        event.preventDefault()
    
        const email = this.emailInput.value
        const password = this.passwordInput.value
        app.auth().fetchProvidersForEmail(email)
        .then((providers) => {
          if (providers.length === 0) {
            // create user
            return app.auth().createUserWithEmailAndPassword(email, password)
          }  else {
            // sign user in
            return app.auth().signInWithEmailAndPassword(email, password)
          }
        })
        .then((user) => {
          if (user && user.email) {
            this.loginForm.reset()
            this.setState({redirect: true})
          }
          this.forceUpdate()
        })
        .catch((error) => {
          this.toaster.show({ intent: Intent.DANGER, message: error.message })
        })
    }
    
    
    render(){
        if (this.state.redirect === true) {
            return <Redirect to ='/' />
        }
        return(
            <div>
                <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
                <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
            </label>
            <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
            </label>
            <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
                
                </form>
                <Toaster ref={(element) => { this.toaster = element }} />
            </div>
        )
    }

}

export default Login