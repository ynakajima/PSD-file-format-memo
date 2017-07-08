/// <reference path="../../../node_modules/@types/node/index.d.ts" />
import { FileHeaderSection } from '../../model/section/FileHeaderSection'
import { DataView } from '../../util/DataView'

export class FileHeaderSectionBufferBuilder {
  /**
   * ## Build buffer of File Header Section.
   *
   * ### Sample:
   * ```javascript
   * const header = new FileHeaderSection()
   * const buf = FileHeaderSectionBufferBuilder.buildBuffer(header)
   *
   * // Prints: <Buffer ....>
   * console.log(buf)
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
   *
   * @param header Instance of FileHeaderSection.
   */
  static buildBuffer (source: FileHeaderSection): Buffer {
    const buf = Buffer.alloc(FileHeaderSectionBufferBuilder.HEADER_SIZE)
    const dataView = new DataView(buf)

    // signature
    dataView.writeString(source.signature)

    // version
    dataView.writeUInt16(source.version)

    // reserved
    dataView.skip(6)

    // numChannel
    dataView.writeUInt16(source.numChannels)

    // height
    dataView.writeUInt32(source.height)

    // width
    dataView.writeUInt32(source.width)

    // depth
    dataView.writeUInt16(source.depth)

    // color mode
    dataView.writeUInt16(source.colorMode)

    return dataView.buffer
  }
}

export namespace FileHeaderSectionBufferBuilder {
  export const HEADER_SIZE = 26
}
