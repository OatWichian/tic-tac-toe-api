export const FileExtensionMapping = {
  image: {
    jpg: {
      extension: 'jpg',
      mimetype: 'image/jpeg',
      strMimeType: 'image/jpeg',
    },
    png: {
      extension: 'png',
      mimetype: 'image/png',
      strMimeType: 'image/png',
    },
    svg: {
      extension: 'svg',
      mimetype: 'image/svg+xml',
      strMimeType: 'image/svg+xml',
    },
  },
  document: {
    pdf: {
      extension: 'pdf',
      mimetype: 'application/pdf',
      strMimeType: 'application/pdf',
    },
    doc: {
      extension: 'doc',
      mimetype: 'application/msword',
      strMimeType: 'application/msword',
    },
    docx: {
      extension: 'docx',
      mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      strMimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    xls: {
      extension: 'xls',
      mimetype: 'application/vnd.ms-excel',
      strMimeType: 'application/vnd.ms-excel',
    },
    xlsx: {
      extension: 'xlsx',
      mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      strMimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    txt: {
      extension: 'txt',
      mimetype: 'text/plain',
      strMimeType: 'text/plain',
    },
  },
  video: {
    mp4: {
      extension: 'mp4',
      mimetype: 'video/mp4',
      strMimeType: 'video/mp4',
    },
    mov: {
      extension: 'mov',
      mimetype: 'video/quicktime',
      strMimeType: 'video/quicktime',
    },
  },
  sound: {
    mp3: {
      extension: 'mp3',
      mimetype: 'audio/mpeg',
      strMimeType: 'audio/mpeg',
    }
  },
  '3d': {
    gltfJson: {
      extension: 'glb',
      mimetype: 'model/gltf+json',
      strMimeType: 'model/gltf+json',
    },
    octetStream: {
      extension: 'glb',
      mimetype: 'application/octet-stream',
      strMimeType: 'model/gltf+json',
    },
  },
};
