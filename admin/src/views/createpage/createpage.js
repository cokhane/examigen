import React, { Component } from 'react';
import {Modal, Form, Icon,Input} from 'antd';
import jwt from 'jsonwebtoken';
import './createpage.css'



 export default class CreatePage extends Component {
  constructor(props){
    super(props);
    this.state ={
      userFirstname:'',
      userLastname:'',
      userEmail:'',
      userAge:'',
      userCompany:'',
      userGender:'',
      userPassword:'123456'
    }
  }


  success = () => {
    Modal.success({
      title: 'success',
    });
  }

  error = () => {
    Modal.error({
      title: 'invalid!',
    });
  }
  //--
  saveUser = async () => {
    const res = await fetch(`http://localhost:4000/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "firstname": this.state.userFirstname,
        "lastname": this.state.userLastname,
        "age": this.state.userAge,
        "gender": this.state.userGender,
        "company": this.state.userCompany,
        "password": this.state.userPassword,
        "email": this.state.userEmail,
      })
    });
    const response = await res.json();
    console.log('responsL ', response)

    if (response.status == "200") {
      return true
    } else {
      return false
    }
  };

  saveUserModal = async () => {
    if(await this.saveUser()){
      this.success()
      this.clearAllState()
    }else{
      this.error()
    }
  }

  clearAllState =async() => {
    let addUserInput = await document.getElementsByClassName('erase-data')
    for (var i = 0; i < addUserInput.length; i++) {
        // addUserInput[i].children[1].value = ""
        console.log(addUserInput[i].value)
    }
  }


  onChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }



  componentDidMount(){
    this.props.eventFunction('Create Page');
  }


  render(){
      return (
        <div>
        <div className="">
          <input className="erase-data create-page-form form-control"  type="text" placeholder="Firstname..." name="userFirstname"  onChange={this.onChange}/> <br/>
          <input className="erase-data create-page-form form-control"  type="text" placeholder="Lastname..." name="userLastname"  onChange={this.onChange}/> <br/>
          <input className="erase-data create-page-form form-control"  type="email" placeholder="Email..." name="userEmail"  onChange={this.onChange}/> <br/>
          <input className="erase-data create-page-form form-control"  type="text" placeholder="Age..." name="userAge"  onChange={this.onChange}/> <br/>
          <input className="erase-data create-page-form form-control"  type="text" placeholder="Company..." name="userCompany"  onChange={this.onChange}/> <br/>
          <input className="erase-data create-page-form form-control"  type="text" placeholder="Gender..." name="userGender"  onChange={this.onChange}/> <br/>

        </div>
        <button className="btn btn-primary btn-sm" onClick={this.saveUserModal} >Save</button>

        </div>
     );
   }
}
