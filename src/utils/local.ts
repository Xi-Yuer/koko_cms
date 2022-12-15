interface IAccount {
  phone: string
  password: string
}
class Local {
  set(key: string, value: any) {
    const result = JSON.stringify(value)
    window.localStorage.setItem(key, result)
  }
  get(key: string): IAccount {
    const value = window.localStorage.getItem(key) || ''
    const result = JSON.parse(value)
    return result
  }
  remove(key: string) {
    window.localStorage.removeItem(key)
  }
  clear() {
    window.localStorage.clear()
  }
}

export default new Local()
