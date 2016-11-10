/* global describe, it */
const chai = require('chai')
const { expect } = chai
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const fs = require('fs')
const path = require('path')
const { getDumpInfo, getValidatedDumpInfo } = require('../')

describe('getDumpInfo', () => {
  it('should read information of valid render dumps', () => {
    const rs = fs.createReadStream(path.join(__dirname, 'valid.dump'))
    return getDumpInfo(rs)
      .then(({ width, height, spp, renderTime }) => {
        expect(width).to.equal(123)
        expect(height).to.equal(42)
        expect(spp).to.equal(100)
        expect(renderTime).to.equal(2792)
      })
  })

  it('should reject if the stream ends unexpectedly', () => {
    const rs = fs.createReadStream(path.join(__dirname, 'invalid.dump'))
    return expect(getDumpInfo(rs)).to.be.rejectedWith(Error)
  })

  it('should not reject if the dump body is invalid', () => {
    const rs = fs.createReadStream(path.join(__dirname, 'invalid-body.dump'))
    return getDumpInfo(rs)
      .then(({ width, height, spp, renderTime }) => {
        expect(width).to.equal(123)
        expect(height).to.equal(42)
        expect(spp).to.equal(100)
        expect(renderTime).to.equal(2792)
      })
  })
})

describe('getValidatedDumpInfo', () => {
  it('should read information of valid render dumps', () => {
    const rs = fs.createReadStream(path.join(__dirname, 'valid.dump'))
    return getDumpInfo(rs)
      .then(({ width, height, spp, renderTime }) => {
        expect(width).to.equal(123)
        expect(height).to.equal(42)
        expect(spp).to.equal(100)
        expect(renderTime).to.equal(2792)
      })
  })

  it('should reject if the header is valid but the dump body is not', () => {
    const rs = fs.createReadStream(path.join(__dirname, 'invalid-body.dump'))
    return expect(getValidatedDumpInfo(rs)).to.be.rejectedWith(Error)
  })
})
