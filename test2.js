const ftp = require('basic-ftp')

example()

async function example() {
  const client = new ftp.Client()
  client.ftp.verbose = true
  try {
    await client.access({
      host: 'ftp.nghiajs.com',
      user: 'nghiajsc',
      password: 'Tranmeji@1234',
      secure: false,
    })
    //console.log(await client.list())
    // client.trackProgress((info) => console.log(info.bytesOverall))
    // Stop logging
    // await client.uploadFrom('README.md', 'ktacn.nghiajs.com/README_FTP.md')
    // await client.downloadTo('README_COPY.md', 'ktacn.nghiajs.com/README_FTP.md')
    await client.ensureDir('ktacn.nghiajs.com/dist')
    // await client.clearWorkingDir()
    await client.uploadFromDir('dist')
    // client.trackProgress()
  } catch (err) {
    console.log(err)
  }
  client.close()
}
