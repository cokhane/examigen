import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Breadcrumb, Icon ,Dropdown, Modal} from 'antd';

import history from '../../../../history/history.js';
import '../../../../css/component/header.css';

// import moment from 'moment';

// for the socket client notification
// var io =  require('socket.io-client')
// const socket = io('https://api.payqr.cash/');


var $ = require('jquery');
window.$ = $;

class Header extends Component {
  constructor(props){
    super(props);
      this.state = {
        balance:"0.00",
        icon:'exclamation',
        icon2:'check',

        message: '',
        notiftype: '',
        time: '',

        notifbluedot:'none',
        limit:0,

        headerTitle:this.props.headerTitle,

        notifdata: [],
        dropdownClick:false
     }
  }

  gotoLogin = () => {
    window.localStorage.setItem("session",'');
    this.success()
    history.push('/login')
  }

  //POP UP
  success = () => {
    Modal.success({
      title: 'Success',
      maskClosable:'false'
    });
  }



  componentDidMount(){

  }


    render(){
      const menu = (
            <Menu>
              <Menu.Item>
                <div onClick={this.gotoLogin}>Logout</div>
              </Menu.Item>
            </Menu>
          );

      const menuLanguage = (
            <Menu>
              <Menu.Item  >
                <div onClick={(e) => this.languageEnglish("en")}>English</div>
              </Menu.Item>
              <Menu.Item>
                <div  onClick={(e) => this.languageEnglish("zh")}>Chinise</div>
              </Menu.Item>
            </Menu>
          );


      return (
        <div className="header-container">
          <div className="flex-end">
            <div className="header-icon flex-end">


              <div>
                <Dropdown overlay={menu}>
                <a>
                 <FontAwesomeIcon className="icon" icon="sign-in-alt"/>
                </a>
                </Dropdown>
              </div>

            </div>
          </div>
        </div>
     );
   }
 }

 export default Header;
