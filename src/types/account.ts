export interface IAccount {
  id: number
  marks: TMark[]
  type: AccountType
  login: string
  password: string | null
}

export interface IAccountSaved {
  id: number
  marks: string
  type: AccountType
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
