/// <reference path="../../../node_modules/@types/node/index.d.ts" />
import { FileHeaderSection } from '../../section/FileHeaderSection'

export class FileHeaderSectionParser {
  /**
   * ## Parse File Header Section.
   * @param buffer Buffer of PSD File.
   * @param offset Offset of header section (default: 0).
   *
   * ### Usage
   * ```javascript
   * const psd = fs.readFileSync('foo.psd')
   *
   * // parse file header section
   * const header = FileHeaderSectionParser.parse(psd, 0)
   *
   * console.log(header.signature) // 8BPS
   * console.log(header.numChannels) // 4
   * console.log(header.height) // 1200
   * console.log(header.width) // 800
   * console.log(header.depth) // 8
   * console.log(header.colorMode) // 3
   * ```
   *
   * ### File Header Section structure
   * | Length | type | Description |
   * |-------:|------|-------------|
   * | 4 | uint8 * 4 | Signature: always equal to '8BPS'. |
   * | 2 | uint8 | Version: always equal to 1. (**PSB** version is 2.) |
   * | 6 |  | Reserved: must be zero. |
   * | 2 | uint16 | The number of channels in the image, including any alpha channels. Supported range is 1 to 56. |
   * | 4 | uint32 | The height of the image in pixels. Supported range is 1 to 30,000. (**PSB** max of 300,000) |
   * | 4 | uint32 | The width of the image in pixels. Supported range is 1 to 30,000. (**PSB** max of 300,000) |
   * | 2 | uint16 | Depth: the number of bits per channel. Supported values are 1, 8, 16 and 32.
   * | 2 | uint16 | The color mode of the file. Supported values are: Bitmap = 0; Grayscale = 1; Indexed = 2; RGB = 3; CMYK = 4; Multichannel = 7; Duotone = 8; Lab = 9. |
   */
  static parse (buffer: Buffer, offset: number = 0): FileHeaderSection {
    const header = new FileHeaderSection()

    // read signature
    const signature = buffer.toString('ascii', offset, offset + 4)
    if (signature !== FileHeaderSection.SIGNATURE) {
      throw new Error('Not a PSD File.')
    }

    // read version
    header.version = buffer.readUInt16BE(offset + 4)

    // read number of channels
    header.numChannels = buffer.readUInt16BE(offset + 12)

    // read height
    header.height = buffer.readUInt32BE(offset + 14)

    // read width
    header.width = buffer.readUInt32BE(offset + 18)

    // read color depth
    header.depth = buffer.readUInt16BE(offset + 22)

    // read color mode 
    header.colorMode = buffer.readUInt16BE(offset + 24)

    return header
  }
}