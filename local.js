var mysql = require('mysql');

var config = require('./config.json');

var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
});

// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'test'
// });



pool.getConnection(function (err, connection) {
    if (err) throw err;
    // Use the connection
    var sql = "INSERT INTO cars (brand, model,owner_id) VALUES ('Tata Tiago', 'XZ+', '37')"
    connection.query(sql, function (error, results, fields) {
        console.log("error", error)
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        else console.log("1 record inserted");
        process.exit();
    });
});
