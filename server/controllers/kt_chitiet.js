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


// Get all Chitiet
exports.getAllChitiet = function ( req, res){
  var query = 'SELECT * FROM chitiet' ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: 'A list of all Chitiet',
                  chitiets: rows,
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


// get single Chitiet
exports.getSingleChitiet = function (req, res) {
    var query = 'SELECT * FROM chitiet WHERE id = '+ req.params.id ;
    var mysqlConnection = createConnect(req, res);
    mysqlConnection.connect((err) => {
        if (!err){
            mysqlConnection.query(query, (err, rows, fields) => {
                mysqlConnection.destroy()
                if (!err) {
                  //res.send(rows);
                  return res.status(200).json({
                    success: true,
                    message: `More on: Chitiet`,
                    chitiet: rows,
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

// get group CtID Chitiet
exports.getChitiet = function (req, res) {
  var query = 'SELECT * FROM chitiet WHERE ctid = '+ req.params.ctid ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: `More on: Chitiet`,
                  chitiets: rows,
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
// Create Chitiet
exports.createChitiet =  function (req, res) {
  var query= 'INSERT INTO chitiet (`id`, `ctid`, `diengiai`, `tkno`, `tkco`, `sotien`,`matkno`,`matkco`,`ngoaite`,`ctkhac`) '+
  'VALUES (null,"'+req.body.ctid+'","'+req.body.diengiai+'","'+req.body.tkno+'","'+req.body.tkco+'","'+req.body.sotien +'","","",0,"" )';
  // console.log(req.body)
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
                  message: 'New chitiet created successfully',
                  chitiet: req.body ,
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




// update Chitiet
exports.updateChitiet = function (req, res) {
  var query= 'UPDATE chitiet SET diengiai = "'+ req.body.diengiai+'", tkno = "'+ req.body.tkno +'", tkco = "'+ req.body.tkco+'", sotien = "'+ req.body.sotien +'" WHERE id='+req.body.id ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(200).json({
                  success: true,
                  message: 'Chitiet updated successfully',
                  chitiet: rows,
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

  // delete a Chitiet
exports.deleteChitiet = function (req, res) {
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query('DELETE FROM chitiet WHERE id = ?', [req.params.id], (err, rows, fields) => {  
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(204).json({
                  success: true,
                  message: 'Chitiet Deleted successfully',
                  chitiet: rows,
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


