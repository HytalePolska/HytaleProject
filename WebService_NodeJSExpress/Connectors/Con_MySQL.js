const mysql = require('mysql');


module.exports = class Con_MySQL
{
    constructor()
    {
        this.database = mysql.createPool({
            connectionLimit: 10,
            password: '0fecf3c613dffed104bf',
            user: 'csrv_708300',
            database: 'csrv_708300',
            host: 'mysql.craftserve.pl',
            post: '3306'
        });
    }

    Get()
    {
     this.database.connect();

     this.database.query('SELECT * from MC_Players', function(err, rows, fields) {

        if (!err)    console.log('The solution is: ', rows);
        else         console.log('Error while performing Query.');

      });

     this.database.end();
    }
    Post()
    {
    this.database.connect();

     this.database.end();
    }
    Delete()
    {
        this.database.connect();

        this.database.end();
    }
    Update()
    {
        this.database.connect();

        this.database.end();
    }
}