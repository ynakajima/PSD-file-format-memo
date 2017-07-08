import test from 'ava'
import { FileHeaderSection } from '../../src/model/section/FileHeaderSection'

test('FileHeaderSection Const', (t) => {
  t.is(FileHeaderSection.MIN_PIXELS, 1)
  t.is(FileHeaderSection.MAX_PIXELS, 30000)
  t.is(FileHeaderSection.MAX_PSB_PIXELS, 300000)
  t.is(FileHeaderSection.MIN_NUM_CHANNELS, 1)
  t.is(FileHeaderSection.MAX_NUM_CHANNELS, 56)
})

test('FileHeaderSection Enum', (t) => {
  t.is(FileHeaderSection.Version.PSD, 1)
  t.is(FileHeaderSection.Version.PSB, 2)
})

test('FileHeaderSection#constructor()', (t) => {
  let fileHeaderSection = new FileHeaderSection()
  t.is(fileHeaderSection.width, 1)
  t.is(fileHeaderSection.height, 1)

  fileHeaderSection = new FileHeaderSection(200000, 30000)
  t.is(fileHeaderSection.width, 200000)
  t.is(fileHeaderSection.height, 30000)

  t.throws(() => { let header = new FileHeaderSection(0, 0) })
})

test('setter width height', (t) => {
  let header = new FileHeaderSection()
  let psbHeader = new FileHeaderSection(FileHeaderSection.MAX_PIXELS + 1, FileHeaderSection.MAX_PIXELS + 1)
  t.notThrows(() => { header.height = FileHeaderSection.MIN_PIXELS })
  t.notThrows(() => { header.height = FileHeaderSection.MAX_PIXELS })
  t.notThrows(() => { header.width = FileHeaderSection.MIN_PIXELS })
  t.notThrows(() => { header.width = FileHeaderSection.MAX_PIXELS })

  t.notThrows(() => { psbHeader.height = FileHeaderSection.MIN_PIXELS })
  t.notThrows(() => { psbHeader.height = FileHeaderSection.MAX_PSB_PIXELS })
  t.notThrows(() => { psbHeader.width = FileHeaderSection.MIN_PIXELS })
  t.notThrows(() => { psbHeader.width = FileHeaderSection.MAX_PSB_PIXELS })
  t.notThrows(() => { psbHeader.height = FileHeaderSection.MAX_PIXELS + 1 })
  t.notThrows(() => { psbHeader.width = FileHeaderSection.MAX_PIXELS + 1 })

  t.throws(() => { header.height = FileHeaderSection.MIN_PIXELS - 1 })
  t.throws(() => { header.height = FileHeaderSection.MAX_PIXELS + 1 })
  t.throws(() => { header.width = FileHeaderSection.MIN_PIXELS - 1 })
  t.throws(() => { header.width = FileHeaderSection.MAX_PIXELS + 1 })

  t.throws(() => { psbHeader.height = FileHeaderSection.MIN_PIXELS - 1 })
  t.throws(() => { psbHeader.height = FileHeaderSection.MAX_PSB_PIXELS + 1 })
  t.throws(() => { psbHeader.width = FileHeaderSection.MIN_PIXELS - 1 })
  t.throws(() => { psbHeader.width = FileHeaderSection.MAX_PSB_PIXELS + 1 })
})

test('setter numChannels', (t) => {
  let header = new FileHeaderSection()
  t.notThrows(() => { header.numChannels = FileHeaderSection.MIN_NUM_CHANNELS })
  t.notThrows(() => { header.numChannels = FileHeaderSection.MAX_NUM_CHANNELS })
  t.throws(() => { header.numChannels = FileHeaderSection.MIN_NUM_CHANNELS - 1 })
  t.throws(() => { header.numChannels = FileHeaderSection.MAX_NUM_CHANNELS + 1 })
})

test('FileHeaderSection#isPSB()', (t) => {
  let header = new FileHeaderSection(200, 200)
  let psbHeader = new FileHeaderSection(FileHeaderSection.MAX_PIXELS + 100, 200)
  t.false(header.isPSB())
  t.true(psbHeader.isPSB())
})

test('FileHeaderSection#toJSON()', (t) => {
  let fileHeaderSection = new FileHeaderSection(400, 30)
  let json = fileHeaderSection.toJSON()
  t.deepEqual(json, {
    signature: '8BPS',
    version: 1,
    numChannels: 3,
    height: 30,
    width: 400,
    depth: 8,
    colorMode: 'RGB'
  })
})
