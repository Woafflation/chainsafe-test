export const asyncImportLoader = <T>(asyncImport: () => Promise<T>, attempts = 5): Promise<T> => {
  return new Promise((resolve, reject) => {
    asyncImport()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (attempts === 0) {
            reject(error)
            return
          }
          asyncImportLoader(asyncImport, attempts - 1).then(resolve, reject)
        }, 1000)
      })
  })
}
