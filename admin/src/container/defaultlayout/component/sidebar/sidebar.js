import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Modal, Form, Icon,Input} from 'antd';
import axios from 'axios';

import history from '../../../../history/history.js';
import '../../../../css/component/sidebar.css';
import Logo from '../../../../image/logo/PayQr_3.png';



class Sidebar extends Component {
  constructor(props){
    super(props);
      this.state = {
        openUserBalance:false,
        openUserCharge:false,
        openUserUpdatePhoto:false,
        chargeBalance:null,
        getLanguage:[],
        languageText: [],
        setImage:null,
        imageBlob:null,
        getUserInfoData:[]

     }
  }

  componentDidMount(){
    // this.getUserInfo()
    // this.getLanguage()
    // this.getUserProfile()

  }

  componentWillReceiveProps(nextProps){

    if(nextProps.language !== this.props.language){
      console.log(nextProps.language)
      this.setlanguageText(nextProps.language)
    }
  }

  componentWillMount(){

  }

  // //CRUD
  // getUserInfo = async () => {
  //   const res = await fetch(this.props.api+"/usergetinfo",{
  //     method:'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authentication':window.localStorage.getItem("session"),
  //       'user_id':this.props.userId
  //     },
  //   })
  //
  //   const response = await res.json()
  //   // console.log("getUserInfo: ",response)
  // }

  // userCharge = async () => {
  //   const res = await fetch(this.props.api+"/userbalance",{
  //     method:'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authentication':window.localStorage.getItem("session")
  //     },
  //     body:JSON.stringify({
  //       "user_id":this.props.userId,
  //       "balance":this.state.chargeBalance
  //     })
  //   })
  //
  //   const response = await res.json()
  //   console.log("userCharge: ",response)
  //
  //   if (response.message == "success" ) {
  //       return true
  //   } else {
  //       return false
  //   }
  // }

  // userUpdatePhoto = async () => {
  //
  //   const formData = new FormData()
  //     formData.append(
  //       'userImage',
  //       this.state.imageBlob,
  //       this.state.imageBlob.name
  //     )
  //
  //   const res = await axios.put(this.props.api+"/updateimage", formData, {
  //       headers: {
  //         'authentication':window.localStorage.getItem("session"),
  //         "Content-Type": "multipart/form-data",
  //         "userid":this.props.userId,
  //         }
  //      })
  //
  //   if(res.status == 200){
  //     return true
  //   }else{
  //     return false
  //
  //   }
  // }
  //
  //
  //
  //
  //
  // getUserProfile = async () => {
  //   const res = await fetch(this.props.api + "/usergetinfo", {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "authentication": window.localStorage.getItem("session"),
  //       "user_id": this.props.userId,
  //     },
  //   });
  //   const response = await res.json();
  //   // console.log("getUserProfile", response);
  //
  //
  //   this.setState({
  //     getUserInfoData: response.data
  //   });
  //
  //   this.setImage(this.state.getUserInfoData.profile_img)
  // }
  //
  //
  // setImage = (e) => {
  //
  //   this.setState({
  //     setImage:this.props.api+"/"+e
  //   })
  // }

  tabChange=(headerTitle,url)=>{
    console.log(url)
  history.push(`/${url}`)
  this.props.onClickEvent(headerTitle)
  }

  // openUserBalanceModal = () =>{
  //   this.setState({
  //     openUserBalance:true
  //   })
  // }
  // openUserChargeModal = () =>{
  //   this.setState({
  //     openUserCharge:true
  //   })
  // }
  //
  // openUserUpdatePhotoModal = () => {
  //   this.setState({
  //     openUserUpdatePhoto:true
  //   })
  // }
  //
  // //CLOSE MODAL
  // closeUserBalanceModal = () =>{
  //   this.setState({
  //     openUserBalance:false
  //   })
  // }
  //
  // closeUserUpdatePhotoModal = () => {
  //   this.setState({
  //     openUserUpdatePhoto:false
  //   })
  // }
  //
  // closeUserChargeModal = () =>{
  //   this.setState({
  //     openUserCharge:false
  //   })
  // }
  //
  //
  // //MODAL
  // userChargeModal = async () => {
  //   if(await this.userCharge()){
  //     this.success()
  //     this.closeUserChargeModal()
  //   }else{
  //     this.error()
  //     this.closeUserChargeModal()
  //   }
  // }
  //
  //
  // userUpdatePhotoModal = async () => {
  //   if(await this.userUpdatePhoto()){
  //     this.closeUserUpdatePhotoModal()
  //     this.success()
  //     this.getUserProfile()
  //   }else{
  //     this.error()
  //   }
  // }

  onChange = (e) =>{
  this.setState({[e.target.name]:e.target.value})
  }

  getLanguage = async () => {
    const res = await fetch(this.props.api+"/language",{
     method:'GET',
     headers: {
       "Content-Type": "application/json",
       "authentication": window.localStorage.getItem("session"),
     },
   })
   const response = await res.json()
    this.setState({
     getLanguage: response.data
    });
    this.setlanguageText(this.props.language)

  }

  setlanguageText = async (e) => {
     await this.setState({
       languageText: {
         orderManagement:'Order Management',
         depositManagement:'Deposit Flow Management',
         user:'User',
         balanceRequest:'Balance Request',
       }
     })

     this.translateLanguage(e)
   }

 translateLanguage = async (e) =>{
   if(this.props.language == 'zh'){
       const languageKeys = Object.keys(this.state.languageText)
       let dynamicLanguageText = this.state.languageText

       for(let i = 0; i < languageKeys.length; i++){
         for(let j = 0; j < this.state.getLanguage.length; j++){
           if(this.state.languageText[languageKeys[i]] == this.state.getLanguage[j].keyword){
             dynamicLanguageText[languageKeys[i]] = this.state.getLanguage[j].zh
              await this.setState({
               languageText:dynamicLanguageText
             })
           }
        }
      }
    }else{
  }
 }

 //POP UP
  success = () => {
    Modal.success({
      title: 'success',
    });
  }

  error = () => {
    Modal.error({
      title: 'This is an error message',
      content: 'some messages...some messages...',
    });
  }

  blockPopup = () => {
    Modal.error({
      title: 'You are currently blocked!',
    });
  }


  // previewFile = () => {
  //   let imageFile = document.getElementById('imageFile').files[0]
  //
  //   this.setState({
  //     imageBlob:imageFile
  //   })
  // }



  render(){
    return (
      <div className="sidenav">
        <div className="sidenav-container">
          <div className="logo-container">
              <div className="logo-content">
                <h6>ADMIN PANEL</h6>

              </div>
          </div>

          <div className="sidenav-module-container">
            <div onClick={()=>this.tabChange("Listing Page","listingpage")} className={this.props.headerTitle==="Listing Page" ? "selsectedSidebar" : "sidenav-content"} >
              <div className="sidenav-icon">
                <i  className="sidenav-icon-child">
                  <FontAwesomeIcon icon="donate"/>
                </i>
              </div>
              <div className="sidenav-text">Listing Page</div>
            </div>

            <div className="sidenav-content" onClick={()=>this.tabChange("Create Page","createpage")}  className={this.props.headerTitle==="Create Page" ? "selsectedSidebar" : "sidenav-content"}>
              <div className="sidenav-icon">
                <i className="sidenav-icon-child">
                  <FontAwesomeIcon icon="money-check-alt"/>
                </i>
              </div>
              <div className="sidenav-text">Create Page</div>
            </div>

            <div className="sidenav-content" onClick={()=>this.tabChange("Update Page","updatepage")}  className={this.props.headerTitle==="Update Page" ? "selsectedSidebar" : "sidenav-content"}>
              <div className="sidenav-icon">
                <i className="sidenav-icon-child">
                  <FontAwesomeIcon icon="eye"/>
                </i>
              </div>
              <div className="sidenav-text">Update Page</div>
            </div>

          </div>
        </div>

        {/* ------ MODAL -------  */}

        <Modal
          title="Balance"
          visible={this.state.openUserBalance}
          onOk={this.closeUserBalanceModal}
          onCancel={this.closeUserBalanceModal}
          maskClosable={true}
          >
          <div>
          </div>
        </Modal>


          <Modal
            title="Charge"
            visible={this.state.openUserCharge}
            onOk={this.userChargeModal}
            onCancel={this.closeUserChargeModal}
            maskClosable={true}
            destroyOnClose={true}
            >
            <div>
              <div className="flex-start">

                <div>
                  <strong>
                    Currency Amount:
                  </strong>
                </div>
                <div>
                  <div className="flex-start">
                    <input type="text" className="form-control" style={{marginLeft: "30px"}} onChange={this.onChange} placeholder="Charge Balance" name="chargeBalance"/> <div> RMB</div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            title="Charge"
            visible={this.state.openUserUpdatePhoto}
            onOk={this.userUpdatePhotoModal}
            onCancel={this.closeUserUpdatePhotoModal}
            maskClosable={false}
            destroyOnClose={true}>
            <div>
              <input id="imageFile" type="file" onChange={this.previewFile}/>
            </div>
          </Modal>

      </div>
   );
   }
 }

 export default Sidebar;
