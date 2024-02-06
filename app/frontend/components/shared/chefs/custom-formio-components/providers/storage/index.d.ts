declare const _default: {
  chefs: {
    (formio: any): {
      title: string
      name: string
      uploadFile(file: any, name: any, dir: any, progressCallback: any, url: any, options: any, fileKey: any): any
      deleteFile(fileInfo: any, options: any): any
      downloadFile(file: any, options: any): any
    }
    title: string
  }
  s3custom: {
    (formio: any): {
      title: string
      name: string
      uploadFile(
        file: any,
        fileName: any,
        dir: any,
        progressCallback: any,
        url: any,
        options: any,
        fileKey: any,
        groupPermissions: any,
        groupId: any,
        abortCallback: any
      ): any
      deleteFile(fileInfo: any): any
      downloadFile(file: any): any
    }
    title: string
  }
}
export default _default
