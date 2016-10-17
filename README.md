# chunky-dump-reader

This module exposes a function to get width, height, spp and render time from a [Chunky][chunky] render dump stream.

## Installation
`npm i --save chunky-dump-reader`

## Usage
```js
const { getDumpInfo } = require('chunky-dump-reader')
getDumpInfo(dumpStream).then((info) => {
  // info = {
  //   width        width in pixels
  //   height       height in pixels
  //   spp          samples per pixel
  //   renderTime   render time in ms
  // }
})
```

## License
The files included in this repository are licensed under the MIT license.

[chunky]: https://github.com/llbit/chunky