/**
 * Pure TypeScript ZIP file generator (PKZip standard, STORE format / uncompressed)
 * Packages the entire takakiri-website project into a production-ready git repository zip directly in the browser.
 */

interface ZipEntry {
  path: string;
  data: Uint8Array;
}

const encoder = new TextEncoder();

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function calculateCrc32(data: Uint8Array): number {
  let crc = 0 ^ -1;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

export function createZipArchive(files: { path: string; content: string }[]): Blob {
  const entries: ZipEntry[] = files.map((f) => ({
    path: f.path.replace(/^\/+/, ''),
    data: encoder.encode(f.content),
  }));

  const localHeaders: Uint8Array[] = [];
  const centralDirEntries: Uint8Array[] = [];
  let offset = 0;

  for (const entry of entries) {
    const fileNameBytes = encoder.encode(entry.path);
    const uncompressedSize = entry.data.length;
    const crc = calculateCrc32(entry.data);

    // Local file header (30 bytes + filename length)
    const localHeader = new Uint8Array(30 + fileNameBytes.length);
    const lv = new DataView(localHeader.buffer);

    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true); // STORE
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, uncompressedSize, true);
    lv.setUint32(22, uncompressedSize, true);
    lv.setUint16(26, fileNameBytes.length, true);
    lv.setUint16(28, 0, true);
    localHeader.set(fileNameBytes, 30);

    localHeaders.push(localHeader);
    localHeaders.push(entry.data);

    // Central Directory header (46 bytes + filename length)
    const cdHeader = new Uint8Array(46 + fileNameBytes.length);
    const cdv = new DataView(cdHeader.buffer);

    cdv.setUint32(0, 0x02014b50, true);
    cdv.setUint16(4, 20, true);
    cdv.setUint16(6, 20, true);
    cdv.setUint16(8, 0, true);
    cdv.setUint16(10, 0, true);
    cdv.setUint16(12, 0, true);
    cdv.setUint16(14, 0, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, uncompressedSize, true);
    cdv.setUint32(24, uncompressedSize, true);
    cdv.setUint16(28, fileNameBytes.length, true);
    cdv.setUint16(30, 0, true);
    cdv.setUint16(32, 0, true);
    cdv.setUint16(34, 0, true);
    cdv.setUint16(36, 0, true);
    cdv.setUint32(38, 0, true);
    cdv.setUint32(42, offset, true);
    cdHeader.set(fileNameBytes, 46);

    centralDirEntries.push(cdHeader);
    offset += localHeader.length + entry.data.length;
  }

  const centralDirSize = centralDirEntries.reduce((acc, curr) => acc + curr.length, 0);
  const centralDirOffset = offset;

  // End of Central Directory Record (22 bytes)
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, centralDirSize, true);
  ev.setUint32(16, centralDirOffset, true);
  ev.setUint16(20, 0, true);

  return new Blob([...localHeaders, ...centralDirEntries, eocd], {
    type: 'application/zip',
  });
}
