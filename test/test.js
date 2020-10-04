/* global describe, it */
const chai = require('chai')
const { expect } = chai
const fs = require('fs')
const path = require('path')
const { getDumpInfo, getValidatedDumpInfo } = require('../')

describe('getDumpInfo', () => {
  it('should read information of valid render dumps', async () => {
    const rs = fs.createReadStream(path.join(__dirname, 'valid.dump'))
    const { width, height, spp, renderTime } = await getDumpInfo(rs)
    expect(width).to.equal(123)
    expect(height).to.equal(42)
    expect(spp).to.equal(100)
    expect(renderTime).to.equal(2792n)
  })

  it('should reject if the stream ends unexpectedly', async () => {
    const rs = fs.createReadStream(path.join(__dirname, 'invalid.dump'))
    try {
      await getDumpInfo(rs)
      expect.fail('expected to reject')
    } catch (e) {
      expect(e).to.be.instanceOf(Error)
    }
  })

  it('should not reject if the dump body is invalid', async () => {
    const rs = fs.createReadStream(path.join(__dirname, 'invalid-body.dump'))
    const { width, height, spp, renderTime } = await getDumpInfo(rs)
    expect(width).to.equal(123)
    expect(height).to.equal(42)
    expect(spp).to.equal(100)
    expect(renderTime).to.equal(2792n)
  })
})

describe('getValidatedDumpInfo', () => {
  it('should read information of valid render dumps', async () => {
    const rs = fs.createReadStream(path.join(__dirname, 'valid.dump'))
    const { width, height, spp, renderTime } = await getDumpInfo(rs)
    expect(width).to.equal(123)
    expect(height).to.equal(42)
    expect(spp).to.equal(100)
    expect(renderTime).to.equal(2792n)
  })

  it('should reject if the header is valid but the dump body is not', async () => {
    const rs = fs.createReadStream(path.join(__dirname, 'invalid-body.dump'))
    try {
      await getValidatedDumpInfo(rs)
      expect.fail('expected to reject')
    } catch (e) {
      expect(e).to.be.instanceOf(Error)
    }
  })
})
