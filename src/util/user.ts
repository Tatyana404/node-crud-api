import { User } from '../interface/user'

export const userVerification = (user: User): User | false => {
  const fields: string[] = ['id', 'username', 'age', 'hobbies']

  if (fields.every((field: string) => field in user)) {
    return fields.reduce((previousValue: any, currentValue: string) => ((previousValue[currentValue] = user[currentValue]), previousValue),{})
  } else {
    return false
  }
}
