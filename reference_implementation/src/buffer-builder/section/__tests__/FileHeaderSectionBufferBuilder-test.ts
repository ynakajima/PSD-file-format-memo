/// <reference path="../../../../node_modules/@types/node/index.d.ts" />
import test from 'ava'
import { readFileSync } from 'fs'
import { join } from 'path'
import { FileHeaderSection } from '../../../model/section/FileHeaderSection'
import { FileHeaderSectionBufferBuilder as Builder } from '../FileHeaderSectionBufferBuilder'

const rgba = readFileSync(join(__dirname, '../../../../test/fixture/rgba.psd'))

test((t) => {
  t.is(Builder.HEADER_SIZE, 26)
})

test((t) => {
  let header = new FileHeaderSection(800, 796)
  header.numChannels = 4

  let buf = Builder.buildBuffer(header)
  t.is(buf.toString('hex'), rgba.slice(0, Builder.HEADER_SIZE).toString('hex'))

  // TODO: Test for **PSB** file.
  // TODO: Test for **CMYK** file.
  // TODO: Test for **Grayscale** file.
  // TODO: Test for **Indexed** file.
})
