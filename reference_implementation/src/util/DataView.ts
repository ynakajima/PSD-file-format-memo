/// <reference path="../../node_modules/@types/node/index.d.ts" />
export class DataView {
  buffer: Buffer
  private currentOffset: number = 0

  /**
   * ## Create DataView.
   *
   * ### Examples:
   * ```javascript
   * const buf = new Buffer.from([0x01, 0x02, 0x03])
   * const dataView = new DataView(buf)
   *
   * // Prints: <Buffer 01 02 03>
   * console.log(dataView.buffer)
   * ```
   * @param buffer Buffer of PSD File.
   */
  constructor (buffer: Buffer) {
    this.buffer = buffer
  }

  seek (offset: number): DataView {
    this.currentOffset = offset
    return this
  }

  tell (): number {
    return this.currentOffset
  }

  readUInt8 (offset: number = this.currentOffset): number {
    const value = this.buffer.readUInt8(offset)
    this.seek(offset + 1)
    return value
  }

  readInt8 (offset: number = this.currentOffset): number {
    const value = this.buffer.readInt8(offset)
    this.seek(offset + 1)
    return value
  }

  readUInt16 (offset: number = this.currentOffset): number {
    const value = this.buffer.readUInt16BE(offset)
    this.seek(offset + 2)
    return value
  }

  readInt16 (offset: number = this.currentOffset): number {
    const value = this.buffer.readInt16BE(offset)
    this.seek(offset + 2)
    return value
  }

  readUInt32 (offset: number = this.currentOffset): number {
    const value = this.buffer.readUInt32BE(offset)
    this.seek(offset + 4)
    return value
  }

  readInt32 (offset: number = this.currentOffset): number {
    const value = this.buffer.readInt32BE(offset)
    this.seek(offset + 4)
    return value
  }

  // readString
  readString (length: number, offset: number = this.currentOffset): string {
    const end = offset + length
    const value = this.buffer.toString('utf8', offset, end)
    this.seek(end)
    return value
  }

   // writeUInt8
  writeUInt8 (value: number, offset: number = this.currentOffset): DataView {
    this.buffer.writeUInt8(value, offset)
    this.seek(offset + 1)
    return this
  }

  // writeUInt16
  writeUInt16 (value: number, offset: number = this.currentOffset): DataView {
    this.buffer.writeUInt16BE(value, offset)
    this.seek(offset + 2)
    return this
  }

  // writeUInt32
  writeUInt32 (value: number, offset: number = this.currentOffset): DataView {
    this.buffer.writeUInt32BE(value, offset)
    this.seek(offset + 4)
    return this
  }

  // writeInt8
  writeInt8 (value: number, offset: number = this.currentOffset): DataView {
    this.buffer.writeInt8(value, offset)
    this.seek(offset + 1)
    return this
  }

  // writeInt16
  writeInt16 (value: number, offset: number = this.currentOffset): DataView {
    this.buffer.writeInt16BE(value, offset)
    this.seek(offset + 2)
    return this
  }

  // writeInt32
  writeInt32 (value: number, offset: number = this.currentOffset): DataView {
    this.buffer.writeInt32BE(value, offset)
    this.seek(offset + 4)
    return this
  }

  // writeString
  writeString (str: string, offset: number = this.currentOffset): DataView {
    const end = offset + str.length
    this.buffer.write(str, offset)
    this.seek(end)
    return this
  }
}
