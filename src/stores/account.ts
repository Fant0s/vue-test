import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types/account.ts'

export const useAccountStore = defineStore('account', () => {
  const list = ref<IAccount[]>([])

  const addAccount = (account: IAccount) => {
    list.value.push(account)
  }

  return { list, addAccount }
})
