const mysql = require('mysql');
const IConnector = require('./connector_interface');

class Con_MySQL extends IConnector {
  constructor() {
    super();

  }
  static Connect() {
    return mysql.createConnection({
      connectionLimit: 10,
      password: '0fecf3c613dffed104bf',
      user: 'csrv_708300',
      database: 'csrv_708300',
      host: 'mysql.craftserve.pl',
      post: '3306'
    });
  }

  static Execute(query, res) {

    this.database = this.Connect();
    this.database.query(query, (err, sql_result) => {
      if (!err && sql_result != null) {
        res.json(sql_result); 
      }
      else {
        return "[]";
      }

    });


  }

}
module.exports = Con_MySQL