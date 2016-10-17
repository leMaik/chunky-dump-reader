const binary = require('binary')
const zlib = require('zlib')

const getDumpInfo = (dumpStream) => new Promise((resolve, reject) => {
  let tapped = false
  const ws = binary()
    .word32bs('width')
    .word32bs('height')
    .word32bs('spp')
    .word64bs('renderTime')
    .tap((vars) => {
      tapped = true
      resolve(vars)
    })
  dumpStream.on('end', () => {
    if (!tapped) {
      reject(new Error('Unexpected end of dump stream'))
    }
  })
  dumpStream.pipe(zlib.createGunzip()).pipe(ws)
})

module.exports = {
  getDumpInfo
}
