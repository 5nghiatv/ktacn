const ftp = require('basic-ftp')

uploadDistDir()

async function uploadDistDir() {
  const mainDir = 'ktacn.nghiajs.com'
  const client = new ftp.Client()
  client.ftp.verbose = false // Thông báo dòng lệnh
  try {
    await client.access({
      host: 'ftp.nghiajs.com',
      user: 'nghiajsc',
      password: 'Tranmeji@1234',
      secure: false, // Tắt bảo mật
    })
    //console.log(await client.list())
    client.trackProgress((info) =>
      console.log('File', info.name, info.bytesOverall),
    )
    // await client.uploadFrom('README.md', mainDir + '/README_FTP.md')
    // await client.downloadTo('README_COPY.md', mainDir + '/README_FTP.md')
    await client.ensureDir(mainDir + '/dist')
    await client.clearWorkingDir()
    await client.uploadFromDir('dist')
    // Stop logging
    client.trackProgress()
    console.log('ftp process successfully ...')
  } catch (err) {
    console.log(err)
  }
  client.close()
}
