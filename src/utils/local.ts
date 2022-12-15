interface IAccount {
  phone: string
  password: string
}
class Local {
  async set(key: string, value: any) {
    const result = JSON.stringify(value)
    window.localStorage.setItem(key, result)
  }
  async get(key: string): Promise<IAccount> {
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
