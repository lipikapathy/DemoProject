var mysql = require('mysql');
var config = require('./config.json');

var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
});

exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    context.callbackWaitsForEmptyEventLoop = false;
    pool.getConnection(function (err, connection) {
        if (err) callback(err);
        // Use the connection
        var sql = "INSERT INTO cars (brand, model,owner_id) VALUES ('Tata Tiago', 'XZ+', '37')"
        connection.query(sql, function (error, results, fields) {
            // Handle error after the release.
            if (error) callback(error);
            else {
                console.log("1 record inserted");
                callback(null);
            }
        });
    });
};