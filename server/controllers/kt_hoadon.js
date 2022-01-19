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


// Get all Hoadon
exports.getAllHoadon = function ( req, res){
  var query = 'SELECT * FROM hoadon' ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: 'A list of all Hoadon',
                  hoadons: rows,
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


// get single Hoadon
exports.getSingleHoadon = function (req, res) {
    var query = 'SELECT * FROM hoadon WHERE id = '+ req.params.id ;
    var mysqlConnection = createConnect(req, res);
    mysqlConnection.connect((err) => {
        if (!err){
            mysqlConnection.query(query, (err, rows, fields) => {
                mysqlConnection.destroy()
                if (!err) {
                  //res.send(rows);
                  return res.status(200).json({
                    success: true,
                    message: `More on: Hoadon`,
                    hoadon: rows,
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

// get ctID Hoadon
exports.getHoadon = function (req, res) {
  var query = 'SELECT * FROM hoadon WHERE ctid = '+ req.params.ctid ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: `More on: Hoadon`,
                  hoadons: rows,
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

// Create Hoadon
exports.createHoadon =  function (req, res) {
  var query= 'INSERT INTO hoadon (`id`,`ctid`,`sohd`,`ngay`,`diengiai`,`masothue`,`thuesuat`,`giaban`,`thuegtgt`,`mausohd`,`mamauhd`,`sohdong`,`ngayhdong`,'+
    '`hinhthuctt`,`diemgiao`,`diemnhan`,`sovandon`,`socontaine`,`dvanchuyen`,`dienthoai`,`tygia` ) '+
  'VALUES (null,"'+req.body.ctid+'","'+req.body.sohd+'","'+req.body.ngay+'","'+req.body.diengiai+'","'+req.body.masothue+'","'+req.body.thuesuat+'",'+req.body.giaban+','+req.body.thuegtgt +',"","","","0001-01-01","","","","","","","",0 )';

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
                  message: 'New hoadon created successfully',
                  hoadon: req.body ,
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




// update Hoadon
exports.updateHoadon = function (req, res) {
  //`ctid`,`sohd`,`ngay`,`diengiai`,`masothue`,`thuesuat`,`giaban`,`thuegtg
  var query= 'UPDATE hoadon SET sohd = "'+ req.body.sohd+'", ngay = "'+ req.body.ngay +'", diengiai = "'+req.body.diengiai+
  '", masothue = "'+ req.body.masothue+'", thuesuat = "'+ req.body.thuesuat+'", giaban = '+ req.body.giaban+', thuegtgt = '+ req.body.thuegtgt +' WHERE id='+req.body.id ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(200).json({
                  success: true,
                  message: 'Hoadon updated successfully',
                  hoadon: rows,
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

  // delete a Hoadon
exports.deleteHoadon = function (req, res) {
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query('DELETE FROM hoadon WHERE id = ?', [req.params.id], (err, rows, fields) => {  
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(204).json({
                  success: true,
                  message: 'Hoadon Deleted successfully',
                  hoadon: rows,
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


