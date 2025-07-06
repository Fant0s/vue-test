export interface IAccount {
  id: number
  marks: string
  type: TAccountType.Local
  login: string
  password: string | null
}

export enum TAccountType {
  LDAP = 'LDAP',
  Local = 'Локальная',
}
