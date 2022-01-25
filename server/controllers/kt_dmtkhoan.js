const mysql = require('mysql');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// function createConnect(req, res){
//     return mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         port: process.env.DB_PORT,
//     });
// }


// Get all Dmtkhoan
exports.getAllDmtkhoan = function ( req, res){
  var query = 'SELECT *,sotk as value FROM dmtkhoan ORDER BY sotk' ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: 'A list of all Dmtkhoan',
                  dmtkhoans: rows,
                });
              }else {
                res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: err.message,
                });
              }
          });
      } else {
          console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
      }

  });
}


// get single Dmtkhoan
exports.getSingleDmtkhoan = function (req, res) {
    var query = 'SELECT * FROM dmtkhoan WHERE id = '+ req.params.id ;
    // console.log(query)
    var mysqlConnection = createConnect(req, res);
    mysqlConnection.connect((err) => {
        if (!err){
            mysqlConnection.query(query, (err, rows, fields) => {
                mysqlConnection.destroy()
                if (!err) {
                  //res.send(rows);
                  res.status(200).json({
                    success: true,
                    message: `More on dmtkhoan`,
                    dmtkhoan: rows,
                  });
                }else {
                  res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: err.message,
                  });
                }
            });
        } else {
            console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
        }
    });
}

// Create Dmtkhoan
exports.createDmtkhoan =  function (req, res) {
  var query= 'INSERT INTO dmtkhoan (`id`,`sotk`,`tkhoan`,`tentk`,`diachi`,`nodn`,`codn`,`nodk`,`codk`,`psno`,`psco`,`lkpsno`,`lkpsco`,`nock`,`cock`,`ghichu`,`loaitien`,`ngoaite`,`thuedt`,`lcheck`,`hanmuc`) '+
  'VALUES (null,"'+req.body.sotk+'","","'+req.body.tentk+'","",'+req.body.nodn+','+req.body.codn+',0,0,0,0,0,0,0,0,"","",0,0,0,0'+')';
  //console.log(query)
  
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                req.body.id = rows.insertId ;
                //console.log(req.body)
                res.status(201).json({
                  success: true,
                  message: 'New dmtkhoan created successfully',
                  dmtkhoan: req.body ,
                });
    
              }else {
                res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: err.message,
                });
              }
          });
      } else {
          console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
      }
  });
}




// update Dmtkhoan
exports.updateDmtkhoan = function (req, res) {
  var query= 'UPDATE dmtkhoan SET sotk = "'+ req.body.sotk+'", tentk = "'+ req.body.tentk +'", nodn = '+ req.body.nodn +', codn = '+ req.body.codn +' WHERE id='+req.body.id ;
  console.log(query)

  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(200).json({
                  success: true,
                  message: 'Dmtkhoan updated successfully',
                  dmtkhoan: rows,
                });
    
              }else {
                res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: err.message,
                });
              }
          });
      } else {
          console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
      }
  });
}

  // delete a Dmtkhoan
exports.deleteDmtkhoan = function (req, res) {
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query('DELETE FROM dmtkhoan WHERE id = ?', [req.params.id], (err, rows, fields) => {  
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(204).json({
                  success: true,
                  message: 'Dmtkhoan Deleted successfully',
                  dmtkhoan: rows,
                });
    
              }else {
                res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: err.message,
                });
              }
          });
      } else {
          console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
      }
  });
}
