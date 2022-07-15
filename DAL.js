//importing sqlite3 node module for DB manipulations
const sqlite3 = require('./node_modules/sqlite3/lib/sqlite3.js').verbose();
// using local database
const db = new sqlite3.Database('testDB.db');
// a function fetching all the record from DB and give the response into JSON
const fetchUsersFromDB = (req, res) => {
    let sql = 'SELECT * FROM user';
    //db.run("begin transaction");
    db.all(sql, (err, result) => {
        if (err) {
            console.log('Error running sql: ' + sql)
            console.log(err)
            res.json([]);
        } else {
            //console.log(result);
            res.json(result);
        }
    });
}

// a function inserting the record into DB and give the response into JSON
const insertUsersIntoDB = (req, res) => {
    console.log(req.body);
    let sql = 'INSERT INTO user (id, first_name, last_name, email, avatar) VALUES (?,?,?,?,?)';

    for (var i = 0; i < req.body.length; i++) {
        let temp = [req.body[i].id, req.body[i].first_name, req.body[i].last_name, req.body[i].email, req.body[i].avatar];
        db.run(sql, temp, (err) => console.log(err));
    }
    console.log("record inserted successfully");
    res.json({ status: 'success', data: req.body })
}

//exporting functions
module.exports = { fetchUsersFromDB, insertUsersIntoDB };