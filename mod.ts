// deno-lint-ignore-file no-explicit-any
export default class memory {
  #store
  maxAge

  clear
  delete
  
  constructor({ maxAge }: {
    /**
     * The maximum age for an item in the cache before it becomes overaged and is removed on the next `get()` or `has()` call.
     */
    maxAge: number
  }) {
    this.#store = new Map<any, [number, any]>()
    this.maxAge = maxAge

    this.clear = this.#store.clear
    this.delete = this.#store.delete
  }

  set = (key: any, value: any) => {
    const item = this.#store.get(key)

    if (item)
      this.#store.set(key, [item[0], value])
    else
      this.#store.set(key, [Date.now(), value])
  }

  get = (key: any) => {
    const item = this.#store.get(key)

    if (!item)
      return

    if (Date.now() - item[0] <= this.maxAge)
      return item[1]

    this.#store.delete(key)
  }

  has = (key: any) => {
    const item = this.#store.get(key)

    if (!item)
      return false

    if (Date.now() - item[0] <= this.maxAge)
      return true

    this.#store.delete(key)
    
    return false
  }

  increment = (key: any) => {
    const item = this.#store.get(key)

    if (!item || typeof item[1] !== 'number') {
      this.#store.set(key, [Date.now(), 0])

      return 0
    }

    const updatedCounter = item[1] + 1

    this.#store.set(key, [item[0], updatedCounter])

    return updatedCounter
  }

  size = () => this.#store.size
}
