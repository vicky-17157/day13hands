const mysql = require('mysql2');
const express = require('express');
//const { Schema } = require('mongoose');
var router= express.Router();
//Configuring express server

router.use(express.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vicky@27',
    database: 'customer1',
    multipleStatements: true
    });

mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });

router.get('/fooditems' , (req, res) => {
    mysqlConnection.query('select * from fooditems;', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
    })
} );

router.get('/category' , (req, res) => {
    mysqlConnection.query('select * from category;', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
    })
} );



router.get('/join' , (req, res) => {
    mysqlConnection.query('select fooditems.fname,fooditems.fcost, category.cname,category.calories from fooditems join category on fooditems.cid=category.cid;', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    //return res.console.log(rows);    
    else
    console.log(err);
    })
    } );


//Router to GET specific item detail from the MySQL database
router.get('/fooditems/:fid' , (req, res) => {
    mysqlConnection.query('SELECT * from fooditems WHERE fid = ?',[req.params.fid], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});

router.get('/category/:cid' , (req, res) => {
    mysqlConnection.query('SELECT * from category WHERE cid = ?',[req.params.cid], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});    

router.patch("/update", (req, res) => {
    mysqlConnection.query("UPDATE fooditems SET fname = 'kabab', fcost= 750 WHERE fid = 3;",
    (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
          }
        );
      })
    
    
router.delete('/df/:fid' , (req, res) => {
    mysqlConnection.query('DELETE FROM fooditems WHERE fId = ?',[req.params.fid], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log("Records deleted:",rows.affectedRows);
    })
});

router.delete('/dc/:cid' , (req, res) => {
    mysqlConnection.query('DELETE FROM category WHERE cid = ?',[req.params.cid], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log("Records deleted:",rows.affectedRows);
    })
});    

router.post("/insert", (req, res) => {
    mysqlConnection.query("insert into fooditems(fname,fcost) values('tandoori',655);",
    (err, rows, fields) => {
        if (!err)
        res.send(rows);
        //return res.console.log(rows);
        else
        console.log(err);
          }
        );
      })



module.exports=router;