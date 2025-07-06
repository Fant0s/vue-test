export interface IAccount {
  id: number
  marks: string | TMark[]
  type: AccountType.Local
  login: string
  password: string | null
}

export type IAccountDraft = Omit<IAccount, 'id'>

export enum AccountType {
  LDAP = 'LDAP',
  Local = 'Локальная',
}

export type TMark = {
  text: string
}
