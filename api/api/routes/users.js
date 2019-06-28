const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')



router.get('/', (req,res,next) => {
  User.find()
  // .populate('room','name rent')
  .exec()
  .then(docs => {
    const response = {
      count:docs.length,
      userInfo: docs.map(item => {
          return{
            _id:item._id,
            firstname:item.firstname,
            lastname:item.lastname,
            email:item.email,
            age:item.age,
            company:item.company,
            gender:item.gender,
          }
        })
      }

    if(docs.length > 0){
      res.status(200).json(response)
    }else{
      res.status(404).json({
        message: 'No entries found'
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})



router.post('/signup', (req, res, next) => {
  User.find({email:req.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1){
      return res.status(409).json({
        message:'Mail exists'
      })
    }else{
      bcrypt.hash(req.body.password, 10, (err, hash) => {
       if(err){

         return res.status(500).json({
           error:err
         })
       }else{
         const user = new User({
           _id: new mongoose.Types.ObjectId(),
           firstname: req.body.firstname,
           lastname: req.body.lastname,
           email: req.body.email,
           age: req.body.age,
           company: req.body.company,
           gender: req.body.gender,
           password: hash
         })
         user.save()
         .then(result => {
           res.status(201).json({
             message:'User Created Successfully',
             status:200
           })
         }).catch(err => {
           res.status(500).json({
             error:err
           })
         })
       }
     })
    }
  })
  })

  router.post('/login', (req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1){
        return res.status(404).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password,user[0].password, (err,result) => {
        if(err){
          return res.status(404).json({
            message: 'Auth failed'
          })
        }
        if(result){
          const token = jwt.sign({
            user_id: user[0]._id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email:user[0].email,
          },process.env.JWT_KEY,{
            expiresIn:"1h"
          })
          return res.status(200).json({
            message: 'Auth Successfully',
            token:token,
            status:200
          })
        }
        res.status(401).json({
            message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error:err
      })
    })
  })

  router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId
    User.deleteOne({ _id:id })
      .exec()
      .then(result => {
        res.status(200).json({
          message:"Delete Success!",
          status:200,
          request:{
            type: 'POST',
            url: 'http://localhost:4000/users/',
          }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error:err
        })
      })
  })

  // router.delete('/:userId', (req, res, next) => {
  //   User.deleteOne({_id: req.params.userId})
  //   .exec()
  //   .then(result => {
  //     console.log(result)
  //     result.status(200).json({
  //       message: "User deleted"
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       error:err
  //     })
  //   })
  // })

  const convertDate = (e) => {
    var d = new Date(e),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    today = '' + d.getDay().toString();
    var thisDay = "";
    if(today == "1" ){
      thisDay = "Mon"
    }else if(today == "2"){
      thisDay = "Tue"
    }else if(today == "3"){
      thisDay = "Wed"
    }else if(today == "4"){
      thisDay = "Thur"
    }else if(today == "5"){
      thisDay = "Fri"
    }else if(today == "6"){
      thisDay = "Sat"
    }else{
      thisDay = "Sun"
    }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return month + "-"+ day + "-"+ year;

  }




module.exports = router;
