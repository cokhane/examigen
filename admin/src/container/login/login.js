import React, { Component } from 'react';
import {Modal, Form, Icon,Input} from 'antd';
import jwt from 'jsonwebtoken';
import history  from '../../history/history.js';
import '../../css/login.css';



class Login extends Component {
  constructor(props){
    super(props);
    this.state ={
      loginUsername:null,
      loginPassword:null,
      loginToken:null
    }
  }

  login = async () =>{
    const res = await fetch("http://localhost:4000/users/login",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        "email":this.state.loginUsername,
        "password":this.state.loginPassword
      })
    })

    const response = await res.json()

    // console.log("login : ", response)

    if (response.status == "200" ) {
        const token = response.token
        this.setState({
          loginToken:token
        })
        return true
    } else {return ;
        return false
    }
  }

  onEnter = (e) => {
      if(e.key=="Enter"){
        this.loginModal();
      }
    }
    loginModal = async (e) => {
      if(await this.login()){
          if(await this.checkValidToken()){
            history.replace('/')
            this.success()

          }else{
            this.error()
          }
      }else{
        this.error()
      }

    }


  checkValidToken = () => {
    const checkToken = this.state.loginToken
    console.log(checkToken)
    const key = "secret" // recheck this

    try{

    const verifyToken = jwt.verify(checkToken, key)
    window.localStorage.setItem("session",checkToken);
    return true
    }catch(err){
  	  return false
  	}

  }

  //----------------------------------------------
  testLogin = () => {
    history.replace('/')
  }

  success = () => {
    Modal.success({
      title: 'success',
    });
  }

  error = () => {
  Modal.error({
    title: 'Invalid Login!',
  });
}

  onChange = (e) =>{
  this.setState({[e.target.name]:e.target.value})
  }

  componentDidMount(){

  }

  render(){
      return (
        <div className="login-container">
          <div className="flex-center">
            <div className="login-box">
              <input className="login-username form-control" onKeyPress={this.onEnter} type="text" placeholder="Email..." name="loginUsername"  onChange={this.onChange}/> <br/>
              <input className="login-password form-control" onKeyPress={this.onEnter}  type="password" placeholder="Password..." name="loginPassword" onChange={this.onChange}/>
              <div className="flex-end">
               <button className="btn btn-primary btn-sm" onClick={this.loginModal} >Login</button>


              </div>
            </div>
          </div>
        </div>
     );
   }
}

 export default Login;
