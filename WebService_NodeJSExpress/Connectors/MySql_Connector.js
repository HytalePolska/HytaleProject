
const mysql = require('mysql');

const db = mysql.createConnection({
    connectionLimit: 10,
    password: '0fecf3c613dffed104bf',
    user: 'csrv_708300',
    database: 'csrv_708300',
    host: 'mysql.craftserve.pl',
    post: '3306'
});

db.connect();

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
    }).then(value => { return value }).catch(err => { console.log(err) });


module.exports = Sql_Query;


