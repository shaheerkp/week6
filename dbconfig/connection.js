const MongoClient = require('mongodb').MongoClient;

const state={
    db:null
}

module.exports.connect=function(done){
   
    var url = "mongodb://localhost:27017";
    let dbName="users"

    MongoClient.connect(url,(err,data)=>{
        if (err) {
            return done(err)
            
        }
        else{
            state.db=data.db(dbName)
            done()
        }
        

    })

}

module.exports.get=function(){
    return state.db
}