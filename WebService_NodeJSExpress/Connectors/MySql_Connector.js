
const mysql = require('mysql');

const db = mysql.createConnection({
    connectionLimit: 10,
    password: '0fecf3c613dffed104bf',
    user: 'csrv_708300',
    database: 'csrv_708300',
    host: 'mysql.craftserve.pl',
    post: '3306'
});



const Sql_Query = async (query) => new Promise(
    (resolve, reject) => {

        db.query(query, (err, sql_result) => {
            if (!err && sql_result != null) {
                resolve(sql_result);

            }
            else {
                reject('bad');

            }
        });
    }).then(value => { db.release; return value }).catch(err => { db.release; console.log(query) });


module.exports = Sql_Query;


