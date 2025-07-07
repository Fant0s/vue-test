import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { AccountType, type IAccount, type IAccountSaved, type TMark } from '@/types/account.ts'

const generateId = () => Date.now()

export const useAccountStore = defineStore('account', () => {
  const list = ref<IAccount[]>([])

  const addAccount = () => {
    const newAccount: IAccount = {
      id: generateId(),
      marks: [],
      type: AccountType.Local,
      login: '',
      password: '',
    }
    list.value.push(newAccount)
  }

  const updateAccount = (account: IAccount) => {
    const index = list.value.findIndex((acc) => acc.id === account.id)

    if (index !== -1) {
      list.value[index] = { ...account }
    }
  }

  const saveToStorage = () => {
    localStorage.setItem('accounts-list', JSON.stringify(list.value))
  }

  const loadFromStorage = () => {
    const raw = localStorage.getItem('accounts-list')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          list.value = parsed
        }
      } catch (e) {
        console.error('Ошибка при чтении из localStorage:', e)
      }
    }
  }

  const remakeMarks = (data: IAccountSaved[]): IAccount[] => {
    return data.map((account) => {
      const marksArray: TMark[] = account.marks
        .split(';')
        .map((m) => m.trim())
        .filter(Boolean)
        .map((text) => ({ text }))

      return {
        ...account,
        marks: marksArray,
      }
    })
  }

  const removeAccount = (accountID: number) => {
    list.value = list.value.filter((account) => account.id !== accountID)
  }

  loadFromStorage()
  watch(list, saveToStorage, { deep: true })

  return { list, addAccount, updateAccount, removeAccount }
})
