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


// Get all Chungtu
exports.getAllChungtu = function ( req, res ){
  var query = 'SELECT * FROM ctuktoan WHERE ngay >= ? AND ngay <= ? ORDER BY ngay,soct' ;
  var tudengay = [ req.body.pd_fromdate,req.body.pd_todate];
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query,tudengay, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: 'A list of all Chungtu',
                  chungtus: rows
                });
              }else {
                res.status(500).json({
                  success: false,
                  message: 'Server error. Please try again.',
                  error: err.message,
                  tudengay: tudengay
                });
              }
          });
      } else {
          console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
      }

  });
}


// get single Chungtu
exports.getSingleChungtu = function (req, res) {
    var query = 'SELECT * FROM ctuktoan WHERE id = '+ req.params.id ;
    var mysqlConnection = createConnect(req, res);
    mysqlConnection.connect((err) => {
        if (!err){
            mysqlConnection.query(query, (err, rows, fields) => {
                mysqlConnection.destroy()
                if (!err) {
                  //res.send(rows);
                  return res.status(200).json({
                    success: true,
                    message: `More on Chungtu`,
                    chungtu: rows,
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

// Create Chungtu
exports.createChungtu =  function (req, res) {
  //var ctid = (Date.parse(new Date())/1000).toString().substring(0, 12);
  //var query= 'INSERT INTO ctuktoan (soct, ngay, diengiai, tkno, tkco, sotien,ngaytt,ngaytra,loaitien,ngoaite,userid,matkno,matkco,hopdong,nhom,ghichu,khac,sodk,mamauhd,ctid)  VALUES ("'+req.body.soct+'","'+req.body.ngay +'","'+req.body.diengiai +'","'+req.body.tkno +'","'+req.body.tkco +'", '+req.body.sotien +',"0001-01-01","0001-01-01","001",0,0,"","","","","","","","","'+ctid+'")';
  var query1= "SELECT GetNextCtid() as NextCtid";
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query1, (err, rows, fields) => {
              if (!err) {
                req.body.ctid = rows[0].NextCtid;  // Phải có
                var query = 'INSERT INTO ctuktoan (soct, ngay, diengiai, tkno, tkco, sotien,ngaytt,ngaytra,loaitien,ngoaite,userid,matkno,matkco,hopdong,nhom,ghichu,khac,sodk,mamauhd,ctid)  VALUES ("'+req.body.soct+'","'+req.body.ngay +'","'+req.body.diengiai +'","'+req.body.tkno +'","'+req.body.tkco +'", '+req.body.sotien +',"0001-01-01","0001-01-01","001",0,0,"","","","","","","","","'+req.body.ctid+'")';
                mysqlConnection.query(query, (err, rows, fields) => {
                    mysqlConnection.destroy();
                    if (!err) {
                      req.body.id = rows.insertId ;  // Phải có
                      //console.log(req.body);
                      res.status(201).json({
                        success: true,
                        message: 'New chungtu created successfully',
                        chungtu: req.body,
                      });
                    } else res.status(500).json({ success: false, message: 'Server error. Please try again.',  error: err.message, });
                });
              } else res.status(500).json({ success: false, message: 'Server error. Please try again.',  error: err.message, });
          });
      } else res.status(500).json({ success: false, message: 'Server error. Please try again.',  error: err.message, });
  });
}




// update Chungtu
exports.updateChungtu = function (req, res) {
  var query= 'UPDATE ctuktoan SET soct = "'+ req.body.soct+'", ngay = "'+ req.body.ngay +'", diengiai = "'+ req.body.diengiai +'", tkno = "'+ req.body.tkno +'", tkco = "'+ req.body.tkco +'", sotien = '+ req.body.sotien +' WHERE id='+req.body.id ;
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
                  message: 'Chungtu updated successfully',
                  chungtu: rows,
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

  // delete a Chungtu
exports.deleteChungtu = function (req, res) {
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query('DELETE FROM ctuktoan WHERE id = ?', [req.params.id], (err, rows, fields) => {  
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(204).json({
                  success: true,
                  message: 'Chungtu Deleted successfully',
                  chungtu: rows,
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
