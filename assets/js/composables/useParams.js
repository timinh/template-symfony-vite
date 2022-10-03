export function toUrlParams(params) {
    return Object.keys(params).map(key => {
      if(Array.isArray(params[key])) {
        let arrParam = key + '[]='
        arrParam += params[key].join(`&${key}[]=`)
        return arrParam
      }
      return key + '=' + params[key]
    }).join('&')
}