import { ColorDepth } from '../color/ColorDepth'
import { ColorMode } from '../color/ColorMode'

/**
 * ## File Header Section
 *
 * > The file header contains the basic properties of the image.
 *
 * spec: [http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_19840](http://www.adobe.com/devnet-apps/photoshop/fileformatashtml/#50577409_19840)
 *
 * ### Usage
 * ```javascript
 * let width = 400
 * let height = 600
 * let header = new FileHeaderSection(width, height)
 * console.log(header.width) // 400
 * console.log(header.height) // 600
 * ```
 */
export class FileHeaderSection {
  colorMode: ColorMode = ColorMode.RGB
  depth: ColorDepth = ColorDepth.Depth8bit
  signature: string = FileHeaderSection.SIGNATURE
  version: FileHeaderSection.Version = FileHeaderSection.Version.PSD
  private _numChannels: number = 3
  private _height: number
  private _width: number

  /**
   * Create FileHeaderSection.
   * @param width The width of the image in pixels. Supported range is 1 to 30,000. (**PSB** max of 300,000)
   * @param height The height of the image in pixels. Supported range is 1 to 30,000. (**PSB** max of 300,000.)
   */
  constructor (width: number = FileHeaderSection.MIN_PIXELS, height: number = FileHeaderSection.MIN_PIXELS) {
    const MAX_PIXELS = FileHeaderSection.MAX_PIXELS
    if (width > MAX_PIXELS || height > MAX_PIXELS) {
      this.version = FileHeaderSection.Version.PSB
    }
    this.width = width
    this.height = height
  }

  get numChannels (): number {
    return this._numChannels
  }

  set numChannels (newNumChannels: number) {
    // Supported range is 1 to 56.
    if (
      FileHeaderSection.MIN_NUM_CHANNELS <= newNumChannels &&
      newNumChannels <= FileHeaderSection.MAX_NUM_CHANNELS
    ) {
      this._numChannels = newNumChannels
    } else {
      throw new Error(
        `Out of Range. Supported range is ${FileHeaderSection.MIN_NUM_CHANNELS} to ${FileHeaderSection.MAX_NUM_CHANNELS}.`
      )
    }
  }

  get height (): number {
    return this._height
  }

  set height (newHeight: number) {
    if (
      FileHeaderSection.MIN_PIXELS <= newHeight &&
      (newHeight <= FileHeaderSection.MAX_PIXELS || (this.isPSB() && newHeight <= FileHeaderSection.MAX_PSB_PIXELS ))
    ) {
      this._height = newHeight
    } else {
      throw new Error('Out of Range.')
    }
  }

  get width (): number {
    return this._width
  }

  set width (newWidth: number) {
    if (
      FileHeaderSection.MIN_PIXELS <= newWidth &&
      (newWidth <= FileHeaderSection.MAX_PIXELS || (this.isPSB() && newWidth <= FileHeaderSection.MAX_PSB_PIXELS ))
    ) {
      this._width = newWidth
    } else {
      throw new Error('Out of Range.')
    }
  }

  isPSB (): boolean {
    return this.version === FileHeaderSection.Version.PSB
  }

  toJSON (): object {
    return {
      signature: this.signature,
      version: this.version,
      numChannels: this._numChannels,
      height: this._height,
      width: this._width,
      depth: this.depth,
      colorMode: ColorMode[this.colorMode]
    }
  }
}

export namespace FileHeaderSection {
  // const
  export const SIGNATURE = '8BPS'
  export const MIN_NUM_CHANNELS = 1
  export const MAX_NUM_CHANNELS = 56
  export const MIN_PIXELS = 1
  export const MAX_PIXELS = 30000
  export const MAX_PSB_PIXELS = 300000

  // enum
  export enum Version {
    PSD = 1,
    PSB = 2
  }
}
