const mysql = require('mysql');


const conn = mysql.createPool({
    connectionLimit: 10,
    password: '0fecf3c613dffed104bf',
    user: 'csrv_708300',
    database: 'csrv_708300',
    host: 'mysql.craftserve.pl',
    post: '3306'
})

let chirpdb = {};
chirpdb.all = () => {
    return new Promise((resolve, reject) => {

        conn.query("SELECT * FROM MC_Players", (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

module.exports = chirpdb;