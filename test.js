const mysql = require('mysql')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')
var request = require('request')
const path = require('path')
const xml2js = require('xml2js')
const moment = require('moment')
const axios = require('axios')
const Excel = require('exceljs')
const JSZip = require('jszip')
const os = require('os') //console.log("Platform: " + os.platform(), "Architecture: " + os.arch());
const tmp = require('tmp')
const iconv = require('iconv-lite')
//import _ from 'lodash';
const _ = require('lodash')

const Connect = require('./server/models/connect')
const {
  readFile,
  connection,
  query,
  dbConfig,
} = require('./data/connect/expAsync')
function createConnect() {
  return mysql.createConnection(dbConfig)
}
console.log(
  1,
  'host=' + process.env.DB_HOST,
  2,
  'Database=' + process.env.DB_DATABASE,
  3,
  'user=' + process.env.DB_USERNAME,
)
// ==============================

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms))
//process.env.TZ = 'UTC';
// process.env.TZ = 'GMT';

const { DBFFile } = require('./data/vfp/dbffile/dbf-file')
//const { DBFFile } = require('dbffile')
if (!String.prototype.hasOwnProperty('addSlashes')) {
  String.prototype.addSlashes = function () {
    return this.replace(/'/g, '').replace(/"/g, '').replace(/\\/g, '')
  }
}

function ErrNum(num) {
  return num || 0
}
function iconv1252(str) {
  str = str.addSlashes()
  var buf = iconv.encode(str, 'cp1252')
  return iconv.decode(Buffer.from(buf), 'cp1258')
}

//==================================================
function deleteAllFile(directory, deldir) {
  //const directory = 'public/download/down-temp';
  var directory = path.join(__dirname, directory)
  fs.readdir(directory, (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err
      })
    }
    if (deldir) {
      fs.rmdir(directory, function (err) {
        if (err) throw err
      })
    }
  })
}
//==================================================
//==================================================
function runQuery(query, fromtodate, req, res, fn) {
  var mysqlConnection = createConnect()
  mysqlConnection.connect((err) => {
    if (!err) {
      mysqlConnection.query(query, fromtodate, (err, rows, fields) => {
        mysqlConnection.destroy()
        fn(rows)
      })
    } else {
      console.log(
        'DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2),
      )
      fn([])
    }
  })
}

function zipTest() {
  var fs = require('fs')
  var JSZip = require('jszip')
  var zip = new JSZip()
  // Add a top-level, arbitrary text file with contents
  zip.file('Hello.txt', 'Hello World\n')
  // Create a directory within the Zip file structure
  var img = zip.folder('images')
  // Sample image data
  imgData =
    'R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
  // Add a file to the 'images' directory,
  // and add an image with data URI as contents.
  img.file('star.gif', imgData, { base64: true })
  // JSZip can generate Buffers so you can do the following
  zip
    .generateNodeStream({
      type: 'nodebuffer',
      streamFiles: true,
      compression: 'DEFLATE',
    })
    .pipe(fs.createWriteStream('public/download/test.zip'))
    .on('finish', function () {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log('out.zip written.')
    })
}

//===========================================
function getAllfiles() {
  //===========================================
  const path = require('path')
  const fs = require('fs')
  const log = console.log
  const folder = './'

  fs.readdirSync(folder).forEach((file) => {
    const extname = path.extname(file)
    const filename = path.basename(file, extname)
    const absolutePath = path.resolve(folder, file)
    log(1, absolutePath, file, filename, extname)
  })
}

//===============================================
//upDropbox();

function upDropbox() {
  var filename = './README.md'
  var filenameUp = 'README.md'
  var content = fs.readFileSync(filename)
  console.log(process.env._DROPBOX_TOKEN, 111, content)
  options = {
    method: 'POST',
    url: 'https://content.dropboxapi.com/2/files/upload',
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: 'Bearer ' + process.env._DROPBOX_TOKEN,
      'Dropbox-API-Arg':
        '{"path": "/' +
        filenameUp +
        '","mode": "overwrite","autorename": true,"mute": false}',
    },
    body: content,
  }

  request(options, function (err, res, body) {
    console.log('Err : ' + err, 'res : ' + res, 'body : ' + body)
  })

  request(options, function (err, res, body) {
    console.log('Err : ' + err)
    console.log('res : ' + res)
  })
}

function downDropbox() {
  var token = process.env.DROPBOX_TOKEN
  var filename_l = './testDown.sql'
  var filename_s = 'test.sql'
  var options = {
    method: 'POST',
    url: 'https://content.dropboxapi.com/2/files/download',
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: 'Bearer ' + token,
      'Dropbox-API-Arg': '{"path": "/files/' + filename_s + '"}',
    },
  }
  request(options, function (err, res, body) {
    console.log('Err : ' + err)
    console.log('res : ' + res)
    fs.writeFileSync(filename_l, body)
    //  var file = fs.createWriteStream(filename_l);
    //  body.pipe(file);
  })
}

//===========================================
function restoreData() {
  const host = process.env.DB_HOST
  const user = process.env.DB_USERNAME
  const password = process.env.DB_PASSWORD
  const database = process.env.DB_DATABASE

  //const Importer = require('mysql-import');
  const Importer = require('./data/connect/mysql-import')
  const importer = new Importer({ host, user, password, database })
  // New onProgress method, added in version 5.0!
  importer.onProgress((progress) => {
    var percent =
      Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) /
      100
    console.log(`${percent}% Completed`)
  })

  var token = process.env.DROPBOX_TOKEN
  var filename_s =
    process.env.DB_DATABASE + '_' + process.env.DB_USERNAME + '.sql'
  var filesql = './data/connect/template.sql'
  var options = {
    method: 'POST',
    url: 'https://content.dropboxapi.com/2/files/download',
    encoding: null, // <==== FILE ZIP PHẢI CÓ
    headers: {
      'Content-Type': 'application/octet-stream',
      Authorization: 'Bearer ' + token,
      'Dropbox-API-Arg': '{"path": "/' + filename_s + '"}',
    },
  }
  request(options, function (err, res2, body) {
    //let tmpfile = tempDir+'\\'+ Math.floor(Date.now() / 1000) + '_'+ filename_s;
    let tmpfile = tmp.tmpNameSync() + '_' + filename_s

    fs.writeFileSync(tmpfile, body, 'utf8')
    if (fs.existsSync(tmpfile)) {
      filesql = tmpfile
      body = ''
      console.log(1, 'Download từ dropbox và phục hồi Dữ liệu file: ' + tmpfile)
    } else console.log(1, 'Download from dropbox : ' + res2, '==> phục hồi Dữ liệu trực tiếp file: ' + filename_s)

    importer
      .import(body, filesql)
      .then(() => {
        var files_imported = importer.getImported()
        console.log(`${files_imported.length} SQL file(s) imported.`)
        // res.status(200).json({
        //   success: true,
        //   message: 'Phục hồi Dữ liệu THÀNH CÔNG !!',
        //   filename: filename_s
        // }).end();
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

// ===============================
// const { Readable } = require('stream');
// class BufferStream extends Readable {
//     constructor ( buffer ){
//         super();
//         this.buffer = buffer;
//     }

//     _read (){
//         this.push( this.buffer );
//         this.push( null );
//     }
// }

// function bufferToStream( buffer ) {
//     return new BufferStream( buffer );
// }

//==============================================

function writeZip(dir, name) {
  var zip = new JSZip(),
    code = zip.folder(dir),
    output = zip.generate(),
    filename = ['jsd-', name, '.zip'].join('')

  fs.writeFileSync(path.join(__dirname, filename), output)
  console.log('creating ' + filename)
}

// let aa= null;
// let strd = aa ? aa.split('/').reverse().join('-'): '0000-00-00';
// let newdate =  moment( strd , 'YYYY-MM-DD').toDate();
// let tungay = moment('2021-01-01', 'YYYY-MM-DD').toDate();
// console.log( newdate,tungay)

async function aa() {
  let query = `SELECT * FROM dmtenkho`
  let kq = await runSql(query)
  console.log(kq)
}

async function runSql(query) {
  // console.log(1,'LUÔN LUÔN Chạy Database Gốc MỚI CÓ THÔNG TIN')
  console.log(
    0,
    process.env.APP_URL,
    1,
    '-db:',
    process.env.DB_HOST,
    2,
    process.env.DB_DATABASE,
    3,
    process.env.DB_USERNAME,
  ) // Database GỐC
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  })

  //const connection = createConnect(req, res);
  connection.connect((err) => {
    if (err) {
      console.log('Error: ' + err.message)
    }
  })
  try {
    const response = await new Promise((resolve, reject) => {
      connection.query(query, [], (err, results) => {
        connection.destroy()
        if (err) reject(new Error(err.message))
        resolve(results)
      })
    })
    return response
  } catch (error) {
    console.log(500, error)
  }
}

//setColorScss('_variables1.scss');
// ======================================
function setColorScss(filename) {
  fs.readFile('src/assets/scss/' + filename, 'utf-8', (err, content) => {
    if (err) {
      throw err
    }
    fs.writeFileSync('src/assets/scss/_variables.scss', content)
  })
  // var content = fs.readFileSync("src/assets/scss/_variables.scss", "utf-8");
  // fs.writeFileSync('src/assets/scss/_variables5.scss', content);
}

// let settings = {
//   Dropbox: false,
//   Google: false,
//   NightDisplay: true,
// }

// Object.keys(settings).forEach(function(key) {
//   if (settings[key]) settings[key] = false ;
// })
// console.log(settings)

// const maxSpeed = {
//   car: 300,
//   bike: 60,
//   motorbike: 200,
//   airplane: 1000,
//   helicopter: 400,
//   rocket: 8 * 60 * 60
// };

// const sortable = Object.entries(maxSpeed)
//   .sort(([,a],[,b]) => a-b)
//   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

// console.log(sortable);

// filename_s ="12341243234.sql";
// const name = tmp.tmpNameSync()+'_'+ filename_s;
// console.log('Created temporary filename: ', name);

// traveler = [
//   {  description: 'Senior', Amount: 50, khac: 1000},
//   {  description: 'Senior', Amount: 50, khac: 1000},
//   {  description: 'Adult', Amount: 75, khac: 1000},
//   {  description: 'Child', Amount: 35, khac: 1000},
//   {  description: 'Infant', Amount: 25, khac: 1000 },
// ];
// var cong = traveler.reduce((a, b, c) => +a + +b.Amount+b.khac, 0);
// console.log(cong)

// console.log(moment("29-02-2021",'DD-MM-YYYY').isValid());
// const dateOptions= { year: "numeric", month: "short", day: "numeric" };
// console.log( (new Date).toLocaleDateString("en-GB", dateOptions) );
// console.log( (new Date).toLocaleDateString("ko-KR", dateOptions) );
// // US English uses month-day-year order
// console.log((new Date).toLocaleDateString('en-US')); // → "12/19/2012"
// // British English uses day-month-year order
// console.log((new Date).toLocaleDateString('en-GB')); // → "20/12/2012"
// // Korean uses year-month-day order
// console.log((new Date).toLocaleDateString('ko-KR')); // → "2012. 12. 20."
// // chinese
// console.log((new Date).toLocaleDateString('zh-Hans-CN')); // → "2012/12/20"

async function bb() {
  let query = `SELECT * FROM dmtenkho`
  let kq = await runQuerySync(query)
  console.log(kq)
}

async function runQuerySync(query, params) {
  var mysqlConnection = createConnect(req, res)
  mysqlConnection.connect((err) => {
    if (err) {
      console.log('Error: ' + err.message)
    }
  })
  try {
    const response = await new Promise((resolve, reject) => {
      mysqlConnection.query(query, params, (err, results) => {
        mysqlConnection.destroy()
        if (err) reject(new Error(err.message))
        resolve(results)
      })
    })
    return response
  } catch (error) {
    console.log(500, error)
  }
}

var req = {
  body: {
    fromtodate: {
      pd_fromdate: '2021-06-01',
      pd_todate: '2021-09-30',
    },
  },
}
//tatoansodutk(req);

// var users = [
//   { 'user': 'barney',  'active': false },
//   { 'user': 'fred',    'active': false },
//   { 'user': 'pebbles', 'active': true },
//   { 'user': 'barney', 'active': true }
// ];
// var ss = "pebbles" ;
// var aa= _.findIndex(users, function(o) { return o.user == ss; });
// console.log(aa,users[aa].user);

//testRead('./data/vfp/data/data20')
async function testRead(dir) {
  var dbf = await DBFFile.open(`${dir}/ctuktoan.dbf`)
  console.log(dbf)
  // console.log(`DBF file contains ${dbf.recordCount} records.`);
  // console.log(`Field names: ${dbf.fields.map(f => f.name).join(', ')}`);
  let records = await dbf.readRecords(1)
  for (let record of records) console.log(record)
}

//testWrite('./public/vfp-data/data/data20')
async function test(dir) {
  var namnay = '20'
  var dbf = await DBFFile.open(`${dir}/ctuktoan.dbf`)
  var records = await dbf.readRecords(1)
  await records.forEach((record, index) => {
    var tmp =
      "INSERT INTO ctuktoan (`ctid`,`soct`,`ngay`,`diengiai`,`tkno`,`tkco`,`loaitien`,`sotien`) VALUES ('" +
      namnay.substr(-1) +
      record.CTID +
      "','" +
      iconv1252(record.SOCT) +
      "','" +
      moment(record.NGAY).format('YYYY-MM-DD') +
      "','" +
      iconv1252(record.DIENGIAI) +
      "','" +
      iconv1252(record.TKNO) +
      "','" +
      iconv1252(record.TKCO) +
      "','" +
      iconv1252(record.LOAITIEN) +
      "'," +
      ErrNum(record.SOTIEN) +
      '); '
    console.log(tmp)
    return
  })

  // var str = records[0].DIENGIAI ;
  // str = iconv1252(str);
  // str = str.addSlashes();
  // var buf = iconv.encode(str, 'cp1252');
  // var tmp = iconv.decode(Buffer.from(buf), "cp1258");
  // console.log(str)
}

//import nav from './src/_nav.js'
// const { nav1 } = require('./src/_nav1.js')
// const { nav2 } = require('./src/_nav2.js')
// const nav = [...nav1, ...nav2]
// console.log(nav)

//=========================================== Trần Văn Nghĩa
exports.test = async function (req, res) {
  // let mess = 'Dùng cho test khác - api/testdb thì có sẵn trong main-api.js'
  // res.status(200).json({ message: mess }).end()
  createInvoiceDraft(true, req, res)
}
//==================================================

async function getToken() {
  return await axios({
    method: 'post', //you can set what request you want to be
    url: 'https://api-vinvoice.viettel.vn/auth/login',
    data: {
      username: '0304529821',
      password: 'Tranmeji@1',
    },
    headers: {},
  }).then((data) => {
    return data.data
  })
  //console.log(111, result.data)
}

async function getListInvoice() {
  const token = await getToken()
  const config = {
    method: 'post', //you can set what request you want to be
    url: 'https://api-vinvoice.viettel.vn/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getListInvoiceDataControl',
    data: {
      supplierTaxCode: '0304529821',
      fromDate: '01/03/2022',
      toDate: '02/03/2022',
    },
    headers: {
      Cookie: `access_token=${token.access_token}`,
    },
  }
  //console.log(0000, config)

  const listInvoice = await axios(config)
    .then((data) => {
      return data.data
    })
    .catch((error) => {
      console.log(111, error)
    })
  console.log(222, listInvoice)
}

async function createInvoiceDraft(lPreview, req, res) {
  let cUrl =
    'https://api-vinvoice.viettel.vn/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/createOrUpdateInvoiceDraft/0304529821'
  if (lPreview) {
    cUrl =
      'https://api-vinvoice.viettel.vn/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/createInvoiceDraftPreview/0304529821'
  }
  const token = await getToken()
  const config = {
    method: 'post', //you can set what request you want to be
    url: cUrl,
    data: {
      generalInvoiceInfo: {
        invoiceType: '1',
        templateCode: '1/001',
        invoiceSeries: 'C22TVN',
        currencyCode: 'VND',
        adjustmentType: '1',
        paymentStatus: true,
        cusGetInvoiceRight: true,
      },
      sellerInfo: {
        sellerLegalName: 'DNTN tin học Xuân Mai',
        sellerTaxCode: '0304529821',
        sellerAddressLine: '118/63 Bạch Đằng, P24, Bình Thạnh - HCM - Việt Nam',
        sellerPhoneNumber: '0903917963',
        sellerFaxNumber: '',
        sellerEmail: 'Nghiatv@gmail.com',
        sellerBankName: 'Ngân hàng Đông Á - Sở giao dịch ',
        sellerBankAccount: '003947450002',
        sellerDistrictName: '',
        sellerCityName: 'Thành Phố HCM',
        sellerCountryCode: '84',
        sellerWebsite: 'nghiatv.googlepages.com',
      },
      buyerInfo: {
        buyerName: 'Trần Văn Nghĩa',
        buyerLegalName: 'Tin học Xuân Mai Corpt',
        buyerTaxCode: '0304633928',
        buyerAddressLine: '208 Nguyễn Hữu Cảnh, P22, Q.Bình Thạnh - HCM',
        buyerPostalCode: '700000',
        buyerDistrictName: 'Q.Bình thạnh',
        buyerCityName: 'Thành Phố HCM',
        buyerCountryCode: '84',
        buyerPhoneNumber: '0947501512',
        buyerFaxNumber: '',
        buyerEmail: '5nghiatv@gmail.vn',
        buyerBankName: 'Ngân hàng VietCombank TP HCM',
        buyerBankAccount: '0531002130846',
        buyerIdType: '1',
        buyerIdNo: '080061000211',
        buyerCode: '0947501512',
        buyerBirthDay: '',
      },
      payments: [
        {
          paymentMethod: '3',
          paymentMethodName: 'TM/CK',
        },
      ],
      itemInfo: [
        {
          lineNumber: 1,
          itemCode: 'PCDELLV3653_i56400_R4H10DVDRW',
          itemName:
            'Máy tính để bàn DELL VOSTRO 3653 Desktop Core i5-6400 upto3.30Ghz/ 4GB/1TB HDD/DVDRW/NVIDIA Geforce 705 2Gb/ Wireless-Bluetooth/ K/ M/1Yr Pro',
          unitName: 'Cái',
          itemNote: '',
          unitPrice: 10000000,
          quantity: 1,
          itemTotalAmountWithoutTax: 10000000,
          itemTotalAmountWithTax: 11000000,
          itemTotalAmountAfterDiscount: 0,
          taxPercentage: 10,
          taxAmount: 1000000,
          customTaxAmount: '0',
          discount: 0,
          itemDiscount: 0,
          batchNo: '',
          expDate: '',
        },
      ],
      taxBreakdowns: [
        {
          taxPercentage: 10,
          taxableAmount: 11000000,
          taxAmount: 1000000,
        },
      ],
    },

    headers: {
      Cookie: `access_token=${token.access_token}`,
    },
  }
  //console.log(0000, config)
  const createInvoice = await axios(config)
    .then((data) => {
      return data.data
    })
    .catch((error) => {
      console.log(111, error)
    })
  //console.log(222, createInvoice)
  if (lPreview) {
    let buff = new Buffer(createInvoice.fileToBytes, 'base64')
    let filename = 'Invoice-' + createInvoice.fileName
    if (typeof res != 'undefined') {
      var zip = new JSZip()
      zip.file(filename, buff)
      res.setHeader('Content-Disposition', 'attachment; filename=' + filename)
      res.setHeader('Content-Type', 'application/pdf') // 'application/zip'
      zip
        .generateNodeStream({
          type: 'nodebuffer',
          streamFiles: true,
        }) // Nén thì Phải có compression: 'DEFLATE'
        .pipe(res)
        .on('finish', function () {
          console.log('filename: ' + filename)
        })
      // //res.download(tmpfile)
      // const rs = fs.createReadStream(tmpfile)
      // res.setHeader('Content-Disposition', 'attachment; john-resume.pdf')
      // rs.pipe(res)
    } else {
      let tmpfile = tmp.tmpNameSync() + '_' + filename
      fs.writeFileSync(tmpfile, buff)
      console.log('Save file to : ' + tmpfile)
    }
    // let mess = 'Dùng cho test khác - api/testdb thì có sẵn trong main-api.js'
    // res.status(200).json({ message: mess }).end()
  }
}

//getListInvoice()
//createInvoiceDraft()
createInvoiceDraft(true)
