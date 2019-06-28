import React, { Component } from 'react';
import {Modal, Form, Icon,Input} from 'antd';
import jwt from 'jsonwebtoken';


const $ = require('jquery');
window.$ = $;
$.DataTable = require('datatables.net-dt');




 export default class ListingPage extends Component {
  constructor(props){
    super(props);
    this.state ={
      userList:'',
      dynamicID:''

    }
  }

  //--------MODAL POP UP

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
  //---DELETE MODAL----


  deleteModal = async (e) => {
    if(await this.deletUser(e)){
      this.success()
      this.getUser()
    }else{
      this.error()
    }
  }


  deletUser = async (e) => {
    const res = await fetch(`http://localhost:4000/users/${e}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();

    if(response.status == "200"){
      return true
    }else{
      return false
    }

  };
  
  getUser = async () => {
    const res = await fetch("http://localhost:4000/users", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    console.log("getuser: ",response)
    this.setState({
        userList:response.userInfo
    });
    const getUserDataTable = this.state.userList;
    // console.log("getUser: ",getUserDataTable)
    this.state.table.clear();
    this.pushUserDataInTable(getUserDataTable);
    this.state.table.draw()
  };

  pushUserDataInTable = (e) => {
      e.forEach(items => {
          let id = items._id
          let email = items.email
          let firstname = items.firstname
          let lastname = items.lastname
          let actionButton = '<button class="btn btn-primary btn-sm edit" value="' + id + '">Edit</button> <button class="btn btn-primary btn-sm delete" value="' + id + '">Delete</button></div> '
          this.state.table.row.add([id, email, firstname, lastname, actionButton])
      })
  }

  setTable = () => {
    this.$el = $(this.el)
    this.state.table = this.$el.DataTable()
    this.setButtonForTables()
  }

  setButtonForTables = () => {
    $(this.$el).on('click', 'tbody tr td .edit', (event) => {
        event.stopPropagation();
        this.dynamicID = event.target.value

    });
    $(this.$el).on('click', 'tbody tr td .delete', (event) => {
        event.stopPropagation();
        this.dynamicID = event.target.value

        this.deleteModal(this.dynamicID)

    });

  }





  componentDidMount(){

    this.props.eventFunction('Listing Page');


    this.getUser()
    this.setTable()
  }

  render(){
      return (
        <div>
        <div className="user-table">
            <table className="display" width="100%" ref={el => this.el = el}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Actions</th>
                </tr>
                </thead>
            </table>
        </div>
        </div>
     );
   }
}
