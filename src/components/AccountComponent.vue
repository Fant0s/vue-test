<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import { ref } from 'vue'
import { AccountType, type IAccount, type TMark } from '@/types/account.ts'
import SelectComponent from '@/components/SelectComponent.vue'
import { useAccountStore } from '@/stores/account.ts'

interface IProps {
  account: IAccount
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const errors = ref<{ [key: string]: boolean }>({})
const store = useAccountStore()

const handleDelete = () => {
  emit('delete', props.account.id)
}

const handleSave = (field: 'login' | 'password' | 'marks', value: string | TMark[] | null) => {
  let processed = value

  if (field === 'marks' && typeof value === 'string') {
    processed = value
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((text) => ({ text })) // ← создаём массив TMark[]
  }

  const updated = { ...props.account, [field]: processed }
  store.updateAccount(updated)
  validation(field)
}

const validation = (field: 'login' | 'marks' | 'password') => {
  const value = props.account[field]

  if (field === 'login' && (!value || value.length > 100)) {
    errors.value.login = true
  } else if (field === 'marks' && typeof value === 'string' && value.length > 50) {
    errors.value.marks = true
  } else if (
    field === 'password' &&
    props.account.type === AccountType.Local &&
    (!value || value.length > 100)
  ) {
    errors.value.password = true
  } else {
    errors.value[field] = false
  }
}
</script>

<template>
  <div class="account" :class="{ LDAP: props.account.type === AccountType.LDAP }">
    <InputComponent
      type="marks"
      :value="props.account.marks.map((m) => m.text).join('; ')"
      :error="errors.marks"
      @update:value="(val) => handleSave('marks', val)"
    />

    <SelectComponent :error="errors.type" @update:value="(val) => handleSave('type', val)" />

    <InputComponent
      type="login"
      :value="props.account.login"
      :error="errors.login"
      @update:value="(val) => handleSave('login', val)"
    />

    <InputComponent
      type="password"
      :value="props.account.password"
      :error="errors.password"
      @update:value="(val) => handleSave('password', val)"
    />

    <button class="delete" @click="handleDelete">delete</button>
  </div>
</template>

<style lang="sass" scoped>
.account
  display: grid
  grid-template-columns: 1fr .7fr 1fr 1fr 50px
  gap: 10px
  &.LDAP
    grid-template-columns: 1fr .7fr 2fr 50px
</style>
