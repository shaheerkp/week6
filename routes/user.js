var express = require('express');
var router = express.Router();
var add=require('../helpers/userhelper')



/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  let product=[{img:"",title:"product 1",description:"this is about product one"},
  {img:"",title:"product 1",description:"this is about product one"},
  {img:"",title:"product 1",description:"this is about product one"},
  {img:"",title:"product 1",description:"this is about product one"},
    ]


  res.render('user/index', { product,user  });
});

router.post('/',function(req,res){

  add.addUser(req.body,(data)=>{
 
    res.redirect('/')

  })

})




router.get('/logout',function(req,res){
  delete req.session.user
 
  res.render('user/login',{noHeader:true})
})


router.get('/login',function(req,res){
  
  console.log(req.session.user);
  if (req.session.user) {
    res.redirect('/')
    
  }
  else{

    res.render('user/login',{noHeader:true,"loginerr":req.session.logginErr})
    req.session.logginErr=false

  }

  
 
  
})

router.post('/login',function(req,res){
 
   add.doLogin(req.body).then((response)=>{
    if (response.status) {
      req.session.user=response.user
      req.session.user.loggedin=true
      
      res.redirect('/')
      
    }
    else{
      req.session.logginErr=true
      res.redirect('/login')
    }
     
   })
})

router.get('/signup',function(req,res){
  if (req.session.user) {
    res.redirect('/')
    
  }
  res.render('user/signup',{noHeader:true})
})

router.post('/signup',function(req,res){

  add.addUser(req.body,(data)=>{
    console.log(data);
    if (data.status) {

      res.json({status:true})
      
    }
    else{
      res.json({status:false})
    }

    
  })

})

module.exports = router;
