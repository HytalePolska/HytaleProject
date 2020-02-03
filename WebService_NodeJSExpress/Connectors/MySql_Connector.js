
const mysql = require('mysql');

let db;
handleDisconnect();

//polowanie 
//connect time out
function handleDisconnect() {
    db = mysql.createPool({
        connectionLimit: 1000,
        password: '0fecf3c613dffed104bf',
        user: 'csrv_708300',
        database: 'csrv_708300',
        host: 'mysql.craftserve.pl',
        stream: true,
        post: '3306'
    });
}
db.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        db = handleDisconnect();
    }
})
setInterval(() => {
    db.query('SELECT 1', (err, rows) => {
        if (err) throw err;
    });
}, 60000);

const Sql_Query = async (query) => new Promise(
    (resolve, reject) => {

        db.query(query, (err, sql_result) => {
            if (!err && sql_result != null) {
                resolve(sql_result);

            }
            else {
                console.log(err);
                reject(err);

            }
        });
    }).then(value => { db.release; return value }).catch(err => { db.release; console.log("ERROR" + query); return "503" });


module.exports = Sql_Query;


