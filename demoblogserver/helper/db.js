



const mongoose = require('mongoose');


module.exports=()=>{
    mongoose.connect('mongodb+srv://admin:12312300@cluster0-aokuo.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });
    mongoose.connection.on('open',()=>{
        console.log('MongoDb: Connected');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDb: Error',err);
    });
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise;
};


