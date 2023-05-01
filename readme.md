## memory

```ts
import memory from 'https://deno.land/x/memory@v0.1.0/mod.ts'

const store = new memory({ maxAge: 60 * 1000 }) // a minute

store.set('a', 'example')

console.log(store.get('a')) // 'example'
console.log(store.has('a')) // true

// after a minute:

console.log(store.get('a')) // undefined
console.log(store.has('a')) // false

// a basic counter which is reset every minute:

console.log(store.increment('b')) // 0 <- automatically created
console.log(store.increment('b')) // 1

// update a item:
store.set('a', 'another example') // doesn't modify the age of the item
```
