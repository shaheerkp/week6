var express = require('express'); 
const app = require('../app');
var add=require('../helpers/userhelper')
var router = express.Router();
let adminEmail="kpshaheer123@gmail.com"
let adminpassword="123"


/* GET users listing. */
router.get('/', function(req, res, next) {
  
  if (req.session.admin) {
    console.log("Alredy logged in");
    res.redirect('/admin/home')
  }
  else if(req.session.adminErr){
    console.log("Logging Errrorr");
    res.render('admin/admin-login',{noHeader:true,mes:"Invald credentials"})
    req.session.adminErr=false
  }
  
  else{
    console.log("Logging Errrorr222222222222");
    res.render('admin/admin-login',{noHeader:true})
  } 

});


router.post('/',function(req,res){
  if (adminEmail==req.body.email&&adminpassword==req.body.password) {

    req.session.admin=req.body
    req.session.admin.loggedin=true
    res.redirect('/admin/view-details')
   }
   else{
    req.session.adminErr=true
    res.redirect('/admin')
  }
})



router.get('/add-user',function(req,res){
  res.render('admin/add-users',{noHeader:true})
})


router.post('/add-user',function(req,res){

 add.addUser(req.body,(result)=>{
   
   res.redirect('/admin/home')

 }) 
})










router.get('/view-details',(req,res)=>{
  if (req.session.admin) {
    add.getUser().then((users)=>{
      let status=true
      let email=req.session.admin.email
      console.log("----------------------------------");
      res.render('admin/view-details',{admin:true,users,status,email})
    })
    
  }
  else{
    res.redirect('/admin')
  }


 


})



router.get('/home',function(req,res){
  if (req.session.admin) {
    add.getUser().then((users)=>{
      console.log("___________________________");
      res.redirect('/admin/view-details')
    })
  }
  else{
    res.redirect('/admin')
  }
})


router.get('/updateUser/',function(req,res){
  let id=req.query.id
  let fName=req.query.fName
  let lName=req.query.lName
  let eMail=req.query.eMail
  let phNum=req.query.phNum
  res.render('admin/update-user',{id,fName,lName,eMail,phNum})


})


router.post('/updateUser/',function(req,res){
  add.updateUser(req.body,req.query.id).then((result)=>{
   
    res.redirect('/admin/home')
  })
  
})



router.get('/deleteUser/',function(req,res){
 
  add.deleteUser(req.query.id).then((result)=>{
    res.redirect('home')
    
  })
 })

 

router.get('/logout',function(req,res){
 delete req.session.admin;
  res.redirect('/admin')
})











module.exports = router;
