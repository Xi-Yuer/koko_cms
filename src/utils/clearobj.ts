export function clearObj(obj: { [key: string]: any }) {
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = []
    } else {
      obj[key] = ''
    }
  }
  return obj
}
