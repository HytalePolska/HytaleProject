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
    return mysql.createPool({
        connectionLimit: 10,
        password: '0fecf3c613dffed104bf',
        user: 'csrv_708300',
        database: 'csrv_708300',
        host: 'mysql.craftserve.pl',
        post: '3306'
    });
  }
  async Execute(query)
    {

        
     this.database.getConnection(function (err, connection)
      {
        connection.query(query, function(err, rows, fields) 
        {
            return JSON.stringify(rows);
         });
      });
  
     
    }
}
module.exports = Con_MySQL