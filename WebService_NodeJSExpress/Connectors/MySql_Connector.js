
const mysql = require('mysql');

var Settings = {
    connectionLimit: 100,
    password: '0fecf3c613dffed104bf',
    user: 'csrv_708300',
    database: 'csrv_708300',
    host: 'mysql.craftserve.pl',
    stream: true,
    post: '3306'
};
let pool = mysql.createPool(Settings);

/*setInterval(() => {
    db.query('SELECT 1', (err, rows) => {
        if (err) throw err;
    });
}, 60000);*/

const Sql_Query = async (query) => new Promise(
    (resolve, reject) => {

        pool.getConnection((err, connection) => {

            if (err) {
                console.log("Connecting error +" + err);
            } else {
                connection.query(query, (err, result) => {

                    connection.release();

                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    }).then(value => { return JSON.stringify(value) }).catch(err => {
        console.log("ERROR" + query); return "503"
    });
//console.log(err);

module.exports = Sql_Query;





