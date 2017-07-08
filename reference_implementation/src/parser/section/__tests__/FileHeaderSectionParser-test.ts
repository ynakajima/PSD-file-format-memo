/// <reference path="../../../../node_modules/@types/node/index.d.ts" />
import test from 'ava'
import { readFileSync } from 'fs'
import { join } from 'path'
import { FileHeaderSectionParser } from '../FileHeaderSectionParser'

const rgba = readFileSync(join(__dirname, '../../../../test/fixture/rgba.psd'))

test((t) => {
  const header = FileHeaderSectionParser.parse(rgba)
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

  // TODO: Test for **PSB** file.
  // TODO: Test for **CMYK** file.
  // TODO: Test for **Grayscale** file.
  // TODO: Test for **Indexed** file.
})
