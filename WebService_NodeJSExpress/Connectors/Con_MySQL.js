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
  async Execute(query)
    {

        
    /* this.database.getConnection(function (res, connection)
      {
        await connection.query(query, function(err, rows, fields) 
        {
           
            connection.release();
            console.log(rows);
            return rows;
         });
      });*/
        this.database.connect();
        var result = await this.database.query(query);
        this.database.end();
       return result;
     
    }
  
}
module.exports = Con_MySQL