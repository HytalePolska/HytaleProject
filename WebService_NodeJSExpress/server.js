const express = require('express');
const apiRoudes = require('./roudes');

const app = express();

app.use(express.json());

app.use('/api', apiRoudes);



app.listen(process.env.PORT || '000', () => {
    console.log("Server is running on port: ${process.env.PORT || '000' }")
});
