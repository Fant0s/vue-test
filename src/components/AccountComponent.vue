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

const handleSave = (
  field: 'login' | 'password' | 'marks' | 'type',
  value: string | TMark[] | null,
) => {
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

const validation = (field: 'login' | 'marks' | 'password' | 'type') => {
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
  <tr class="account" :class="{ LDAP: props.account.type === AccountType.LDAP }">
    <td class="cell">
      <div class="cell-content">
        <InputComponent
          name="marks"
          type="marks"
          :value="props.account.marks.map((m) => m.text).join('; ')"
          :error="errors.marks"
          @update:value="(val) => handleSave('marks', val)"
        />
      </div>
    </td>
    <td class="cell">
      <div class="cell-content">
        <SelectComponent
          :error="errors.type"
          :value="props.account.type"
          @update:value="(val) => handleSave('type', val)"
        />
      </div>
    </td>
    <td class="cell" :colspan="account.type !== AccountType.Local ? 2 : 1">
      <div class="cell-content">
        <InputComponent
          name="login"
          type="login"
          :value="props.account.login"
          :error="errors.login"
          @update:value="(val) => handleSave('login', val)"
        />
      </div>
    </td>
    <td class="cell" v-if="account.type === AccountType.Local">
      <div class="cell-content">
        <InputComponent
          name="password"
          type="password"
          :value="props.account.password"
          :error="errors.password"
          @update:value="(val) => handleSave('password', val)"
        />
      </div>
    </td>
    <td class="cell cell-btn">
      <div class="cell-content">
        <button class="delete" @click="handleDelete">delete</button>
      </div>
    </td>
  </tr>
</template>

<style lang="sass" scoped>
.account
  .cell
    .cell-content
      display: flex
      width: 100%
      height: 60px
      padding: 5px
    &.cell-btn
      width: 60px
      min-width: 60px
      max-width: 60px
      .cell-content
        padding: 5px 0
        .delete
          padding: 0
          width: 100%
          height: 100%
</style>
