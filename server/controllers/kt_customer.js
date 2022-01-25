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


// Get all Customer
exports.getAllCustomer_ = function ( req, res){
  var query = 'SELECT *,maso as value FROM customer ORDER BY maso' ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: 'A list of all Customer',
                  customers_: rows,
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


// get single Customer
exports.getSingleCustomer_ = function (req, res) {
    var query = 'SELECT * FROM customer WHERE id = '+ req.params.id ;
    var mysqlConnection = createConnect(req, res);
    mysqlConnection.connect((err) => {
        if (!err){
            mysqlConnection.query(query, (err, rows, fields) => {
                mysqlConnection.destroy()
                if (!err) {
                  //res.send(rows);
                  return res.status(200).json({
                    success: true,
                    message: `More on: Customer`,
                    customer_: rows,
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
exports.getCusTaxcode = function (req, res) {
  var query = 'SELECT * FROM customer WHERE maso = '+ req.params.id ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                return res.status(200).json({
                  success: true,
                  message: `More on: Customer`,
                  customer_: rows,
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

// Create Customer
exports.createCustomer_ =  function (req, res) {
  var query= 'INSERT INTO customer (`id`, `fullname`, `name`, `company`, `address`, `email`, `phone1`, `phone2`, `fax1`, `ghichu`, `group_id`, `maso`, `account`, `bank`, `citibank`, `makhach`) '+
  'VALUES (null,"","","'+req.body.company+'","'+req.body.address+'","","","","","'+req.body.ghichu+'","","'+req.body.maso+'","","","",""'+')';
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
                  message: 'New customer created successfully',
                  customer_: req.body ,
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




// update Customer
exports.updateCustomer_ = function (req, res) {
  var query= 'UPDATE customer SET company = "'+ req.body.company+'", address = "'+ req.body.address +'", maso = "'+ req.body.maso +'", ghichu = "'+ req.body.ghichu +'", account= "'+ req.body.account+'", bank = "'+ req.body.bank +'", citibank = "'+ req.body.citibank+'", phone1 = "'+ req.body.phone1+'" WHERE id='+req.body.id ;
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query(query, (err, rows, fields) => {
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(200).json({
                  success: true,
                  message: 'Customer updated successfully',
                  customer_: rows,
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

  // delete a Customer
exports.deleteCustomer_ = function (req, res) {
  var mysqlConnection = createConnect(req, res);
  mysqlConnection.connect((err) => {
      if (!err){
          mysqlConnection.query('DELETE FROM customer WHERE id = ?', [req.params.id], (err, rows, fields) => {  
              mysqlConnection.destroy()
              if (!err) {
                //res.send(rows);
                res.status(204).json({
                  success: true,
                  message: 'Customer Deleted successfully',
                  customer_: rows,
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


