const mysql = require('mysql');
const IConnector = require('./connector_interface');

class Con_MySQL extends IConnector
{
    constructor()
    {
        super();
    
    }
  Connect()
  {
    return mysql.createConnection({
        connectionLimit: 10,
        password: '0fecf3c613dffed104bf',
        user: 'csrv_708300',
        database: 'csrv_708300',
        host: 'mysql.craftserve.pl',
        post: '3306'
    });
  }
  Execute(query)
    {
     this.database.connect();
     this.database.query(query, function(err, rows, fields) 
     {
        if (!err)     return    console.log(rows);
        else          return    console.log('[]');
      });
    }
}
module.exports = Con_MySQL