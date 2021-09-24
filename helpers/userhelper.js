let db=require('../dbconfig/connection')
const bcrypt = require('bcrypt');
const objectId=require('mongodb').ObjectId


module.exports={
    addUser:async ( user,callback)=>{
      
       
       let users=await db.get().collection('users').findOne({emailAddress:user.emailAddress})
       console.log("__________________________");
        console.log(users);


       if(!users){

                user.password= await bcrypt.hash(user.password,10)
        db.get().collection('users').insertOne(user).then((data)=>{
            console.log("******Data inserted*****");
            let message={
                mes:"Data inserted",
                status:true
            }
           
            callback(message)
        })

       }
       else{
           console.log("&&&&&exist***");
           let message={
            mes:"User exist",
            status:false
        }
       
        callback(message)
           
         

       }
   
       

     

    },
 
    
    getUser:()=>{


        return new Promise((resolve,reject)=>{
            let product=  db.get().collection('users').find().toArray()
        
            resolve(product)

        })
    },


    doLogin:(user)=>{
        return new Promise(async(resolve,reject)=>{
            let isLogged=false;
            let response={}

            let userDetails=await db.get().collection('users').findOne({emailAddress:user.email})
            console.log(user);
            if (userDetails) {
                bcrypt.compare(user.password,userDetails.password).then((done)=>{
                   

                    if (done) {
                        isLogged=true
                        response.user=userDetails
                        response.status=isLogged
                        resolve(response)
                        
                    }
                    else{
                       resolve(isLogged)
                    }

                })
                
            }
            else{
                console.log("Email not match");
                resolve(isLogged)
            }

        })

    },
    deleteUser:(id)=>{
        return new Promise((resolve,reject)=>{

            db.get().collection('users').remove({_id:objectId(id)}).then((result)=>{

               resolve(result)
        })
        
            
        })

    },
    updateUser:(data,id)=>{
        return new Promise((resolve,reject)=>{
            console.log(data);
            db.get().collection('users').updateOne({_id:objectId(id)},{$set:
                {firstName:data.firstName,
                lastName:data.lastName,
                inlineRadioOption:data.inlineRadioOption,
                emailAddress:data.emailAddress,
                phoneNumber:data.phoneNumber
            }}).then((result)=>{
                resolve(result)
            })
            
          
        })
    }
}