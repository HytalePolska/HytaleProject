const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoReconnect:true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
   
  };
 const uRL = "mongodb+srv://JW:qaz123ksp@jwdatabase-a15gw.mongodb.net/test?retryWrites=true&w=majority";
   function connected(msg){}
   function err(msg){}
   function disconnected(msg){}
   function termination(msg){}
 module.exports =function(){

    mongoose.createConnection(uRL,options);

    mongoose.connection.on('connected', function(){
        console.log(connected("Mongoose default connection is open to "));
    });

    mongoose.connection.on('error', function(err){
        console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
    return mongoose.connection;
}

   /* var schema = new mongoose.Schema({ UUID: String, P_Login: String,P_Pass: String, a_date: Date });
    var PlayerModel= mongoose.model('Player', schema);

    new PlayerModel({UUID:"4321"}).save(function (err) {
        if (err) return handleError(err);
        // saved!
      });*/

