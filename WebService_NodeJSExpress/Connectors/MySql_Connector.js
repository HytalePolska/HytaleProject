
const mysql = require('mysql');

let db = handleDisconnect();


function handleDisconnect() {
    return mysql.createConnection({
        connectionLimit: 10,
        password: '0fecf3c613dffed104bf',
        user: 'csrv_708300',
        database: 'csrv_708300',
        host: 'mysql.craftserve.pl',
        post: '3306'
    });
}
db.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        db = handleDisconnect();
        console.log("Rozłączono z bazą danych próba podłączenia");                       // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
})

const Sql_Query = async (query) => new Promise(
    (resolve, reject) => {

        db.query(query, (err, sql_result) => {
            if (!err && sql_result != null) {
                resolve(sql_result);

            }
            else {
                //console.log(err);
                reject(err);

            }
        });
    }).then(value => { db.release; return value }).catch(err => { db.release; console.log("ERROR" + query); return "503"  });


module.exports = Sql_Query;


