export interface IAccount {
  id: number
  marks: TMark[]
  type: AccountType.Local
  login: string
  password: string | null
}

export enum AccountType {
  LDAP = 'LDAP',
  Local = 'Локальная',
}

export type TMark = {
  text: string
}
