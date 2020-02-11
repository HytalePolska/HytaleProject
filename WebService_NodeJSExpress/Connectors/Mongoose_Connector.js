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

mongoose.connect(uRL, options);



    var Job = mongoose.model('Job',  {
        author: {
        type: String,
        index: true
        }});

    Job.create({category: 1, title: 'Minion'}, function(err, doc) {
        // At this point the jobs collection is created.
    });