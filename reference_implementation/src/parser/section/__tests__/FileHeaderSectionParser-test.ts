/// <reference path="../../../../node_modules/@types/node/index.d.ts" />
import test from 'ava'
import { readFileSync } from 'fs'
import { join } from 'path'
import { FileHeaderSectionParser } from '../FileHeaderSectionParser'

const fixtureDir = join(__dirname, '../../../../test/fixture')
const rgba = readFileSync(join(fixtureDir, 'rgba.psd'))
const rgba16bit = readFileSync(join(fixtureDir, 'rgba-16bit.psd'))
const rgba32bit = readFileSync(join(fixtureDir, 'rgba-32bit.psd'))
const cmyk = readFileSync(join(fixtureDir, 'cmyk.psd'))
const lab = readFileSync(join(fixtureDir, 'lab.psd'))
const multicannel = readFileSync(join(fixtureDir, 'multichannel.psd'))
const indexed = readFileSync(join(fixtureDir, 'indexed.psd'))
const grayscale = readFileSync(join(fixtureDir, 'grayscale.psd'))
const bitmap = readFileSync(join(fixtureDir, 'bitmap.psd'))
const psb = readFileSync(join(fixtureDir, 'rgba.psb'))

test((t) => {
  let header = FileHeaderSectionParser.parse(rgba)
  t.falsy(header.isPSB())
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 4,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'RGB'
  })

  header = FileHeaderSectionParser.parse(rgba16bit)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 4,
    height: 796,
    width: 800,
    depth: 16,
    colorMode: 'RGB'
  })

  header = FileHeaderSectionParser.parse(rgba32bit)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 4,
    height: 796,
    width: 800,
    depth: 32,
    colorMode: 'RGB'
  })

  header = FileHeaderSectionParser.parse(cmyk)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 5,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'CMYK'
  })

  header = FileHeaderSectionParser.parse(lab)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 4,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'Lab'
  })

  header = FileHeaderSectionParser.parse(multicannel)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 3,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'Multichannel'
  })

  header = FileHeaderSectionParser.parse(indexed)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 1,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'Indexed'
  })

  header = FileHeaderSectionParser.parse(grayscale)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 2,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'Grayscale'
  })

  header = FileHeaderSectionParser.parse(bitmap)
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 1,
    numChannels: 1,
    height: 796,
    width: 800,
    depth: 1,
    colorMode: 'Bitmap'
  })

  header = FileHeaderSectionParser.parse(psb)
  t.truthy(header.isPSB())
  t.deepEqual(header.toJSON(), {
    signature: '8BPS',
    version: 2,
    numChannels: 4,
    height: 796,
    width: 800,
    depth: 8,
    colorMode: 'RGB'
  })
})
