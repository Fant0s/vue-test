<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue'
import { ref } from 'vue'
import { type IAccount } from '@/types/account.ts'
import SelectComponent from '@/components/SelectComponent.vue'

interface IProps {
  account: IAccount
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()

const error = ref(false)

const handleDelete = () => {
  emit('delete', props.account.id)
}
</script>

<template>
  <div class="account">
    <InputComponent type="marks" :value="props.account.marks" :error="error" />

    <SelectComponent :error="error" />

    <InputComponent type="login" :value="props.account.login" :error="error" />

    <InputComponent type="password" :value="props.account.password" :error="error" />

    <button class="delete" @click="handleDelete">delete</button>
  </div>
</template>

<style lang="sass" scoped>
.account
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 50px
</style>
