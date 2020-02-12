const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    //autoReconnect: true,
    autoIndex: false, // Don't build indexes
  //  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
 //   reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6

};
const uRL = "mongodb+srv://JW:qaz123ksp@jwdatabase-a15gw.mongodb.net/MC_Server?retryWrites=true&w=majority";
function connected(msg) { return msg }
function error(msg) { return msg }
function disconnected(msg) { return msg }
function termination(msg) { return msg }
mongoose.Promise = global.Promise;

module.exports = async () => {

    mongoose.connect(uRL, options);

    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose connected "));
    });

    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });
    return mongoose;
}

