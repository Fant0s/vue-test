import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AccountType, type IAccount } from '@/types/account.ts'

const generateId = () => Date.now()

export const useAccountStore = defineStore('account', () => {
  const list = ref<IAccount[]>([])

  const addAccount = () => {
    const newAccount: IAccount = {
      id: generateId(),
      marks: '',
      type: AccountType.Local,
      login: '',
      password: '',
    }
    list.value.push(newAccount)
  }

  const updateAccount = (accountID: number) => {}

  const removeAccount = (accountID: number) => {
    list.value = list.value.filter((account) => account.id !== accountID)
  }

  return { list, addAccount, updateAccount, removeAccount }
})
