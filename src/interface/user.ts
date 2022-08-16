interface IUserKeys {
  [key: string]: string | number | string[]
}

export interface User extends IUserKeys {
  id: string
  username: string
  age: number
  hobbies: string[]
}
