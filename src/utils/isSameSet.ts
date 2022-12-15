interface IRoute {
  path: string
  name: string
}
export function unique(arr: IRoute[]) {
  const res = new Map()
  return arr.filter(
    a =>
      !res.has(a.path) &&
      res.set(a.path, 1) &&
      !res.has(a.name) &&
      res.set(a.name, 1)
  )
}
