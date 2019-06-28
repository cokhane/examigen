import React, { Component } from 'react';
import {Modal, Form, Icon,Input} from 'antd';
import jwt from 'jsonwebtoken';



 export default class UpdatePage extends Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }



  componentDidMount(){
    this.props.eventFunction('Update Page');
  }

  render(){
      return (
        <div>
            update
        </div>
     );
   }
}
