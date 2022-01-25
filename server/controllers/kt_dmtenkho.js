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


// Get all Dmtenkho
exports.getAllDmtenkho = function ( req, res){
  var query = 'SELECT *,makho as value FROM dmtenkho ORDER BY makho' ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: 'A list of all Dmtenkho',
                  dmtenkhos: rows,
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


// get single Dmtenkho
exports.getSingleDmtenkho = function (req, res) {
    var query = 'SELECT * FROM dmtenkho WHERE id = '+ req.params.id ;
    var mysqlConnection = createConnect(req, res);
    mysqlConnection.connect((err) => {
        if (!err){
            mysqlConnection.query(query, (err, rows, fields) => {
                mysqlConnection.destroy()
                if (!err) {
                  //res.send(rows);
                  return res.status(200).json({
                    success: true,
                    message: `More on: Dmtenkho`,
                    dmtenkho: rows,
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

// Create Dmtenkho
exports.createDmtenkho =  function (req, res) {
  var query= 'INSERT INTO dmtenkho (`id`, `makho`, `tengoi`, `diachi`) '+
  'VALUES (null,"'+req.body.makho+'","'+req.body.tengoi+'","'+req.body.diachi +'")';
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
                  message: 'New dmtenkho created successfully',
                  dmtenkho: req.body ,
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




// update Dmtenkho
exports.updateDmtenkho = function (req, res) {
  var query= 'UPDATE dmtenkho SET makho = "'+ req.body.makho+'", tengoi = "'+ req.body.tengoi +'", diachi = "'+ req.body.diachi +'" WHERE id='+req.body.id ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(200).json({
                  success: true,
                  message: 'Dmtenkho updated successfully',
                  dmtenkho: rows,
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

  // delete a Dmtenkho
exports.deleteDmtenkho = function (req, res) {
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query('DELETE FROM dmtenkho WHERE id = ?', [req.params.id], (err, rows, fields) => {  
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(204).json({
                  success: true,
                  message: 'Dmtenkho Deleted successfully',
                  dmtenkho: rows,
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


