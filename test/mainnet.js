const test = require('tape')
const HttpProvider = require('ethjs-provider-http')
const provider = new HttpProvider('https://mywanwallet.nl/api')
const notFound = 'WNS name not defined.'

const ENS = require('../')
const ens = new ENS({ provider, network: '1' })
test('not providing a network throws', function (t) {
  t.plan(1)
  t.throws(function() {
    const sample = new ENS({ provider })
  })
})

test('not providing a provider throws', function (t) {
  t.plan(1)
  t.throws(function() {
    const sample = new ENS({ network: '1' })
  })
})

test('lookup tyrion70.wan', function (t) {
  t.plan(1)

  ens.lookup('tyrion70.wan')
  .then((address) => {
    const expected = '0x664949908413517b993c6784b44428d080d1a1fa'
    t.equal(address, expected)
    t.end()
  })
  .catch((reason) => {
    t.ok(false)
  })
})

test('getOwner for nobodywantsthisdomain.wan', function (t) {
  t.plan(1)

  ens.getOwner('nobodywantsthisdomain.wan')
  .then((owner) => {
    console.log('it is owned ', owner)
    t.ok(owner)
    t.end()
  })
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('getOwner empty name', function (t) {
  t.plan(1)

  ens.getOwner('')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('getResolver empty name', function (t) {
  t.plan(1)

  ens.getOwner('')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('reverse tyrion70.wan address should return address', function (t) {
  t.plan(1)

  const address = '0xE0155E9233B1502d4b32840f7E0A8DeB6C37f505'
  ens.reverse(address)
  .then((name) => {
    const expected = 'tyrion70.wan'
    t.equal(name, expected)
  })
  .catch((reason) => {
    t.ok(false, reason)
  })
})

test('lookup nobodywantsthisdomain.wan address', function (t) {
  t.plan(1)

  ens.lookup('nobodywantsthisdomain.wan')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('lookup bar.wan address', function (t) {
  t.plan(1)

  ens.lookup('bar.wan')
  .then((address) => {
    t.equal(address, '0xd0b85aad460f5835c2349fbdd065b2389c921ce1')
  })
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})

test('lookup empty address', function (t) {
  t.plan(1)

  ens.lookup('')
  .catch((reason) => {
    t.equal(reason.message, notFound)
  })
})
