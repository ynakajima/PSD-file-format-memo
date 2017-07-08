/// <reference path="../../../node_modules/@types/node/index.d.ts" />
import { FileHeaderSection } from '../../model/section/FileHeaderSection'
import { DataView } from '../../util/DataView'

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
   *
   * spec: http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_19840
   *
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
    const dataView = new DataView(buffer)
    const header = new FileHeaderSection()

    // read signature
    const signature = dataView.readString(4)
    if (signature !== FileHeaderSection.SIGNATURE) {
      throw new Error('Not a PSD File.')
    }

    // read version
    header.version = dataView.readUInt16()

    // read number of channels
    header.numChannels = dataView.readUInt16(12)

    // read height
    header.height = dataView.readUInt32()

    // read width
    header.width = dataView.readUInt32()

    // read color depth
    header.depth = dataView.readUInt16()

    // read color mode
    header.colorMode = dataView.readUInt16()

    return header
  }
}
