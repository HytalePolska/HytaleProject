
const mongoose = require("mongoose");
const uri = 'mongodb+srv://JW:123@jwdatabase-a15gw.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = mongoose;