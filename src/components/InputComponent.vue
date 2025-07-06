<script setup lang="ts">
import { ref } from 'vue'
import type { TMark } from '@/types/account.ts'

interface IProps {
  value: string | TMark[] | null
  type: 'login' | 'password' | 'marks'
  error?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  value: '',
  error: false,
})

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const inputType = ref<'password' | 'text'>('password')
const toggleVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}

const handleLoseFocus = () => {
  isFocused.value = false
}
</script>

<template>
  <div
    class="input"
    :class="{ password: props.type === 'password', error: props.error, focus: isFocused }"
  >
    <input
      ref="inputRef"
      placeholder="Значение"
      :type="props.type === 'password' ? inputType : type"
      @focus="isFocused = true"
      @blur="handleLoseFocus"
    />
    <template v-if="props.type === 'password'">
      <button class="visible" @click="toggleVisibility">
        {{ inputType === 'password' ? 'show' : 'hide' }}
      </button>
    </template>
  </div>
</template>

<style lang="sass" scoped>
.input
  display: flex
  justify-content: center
  align-items: center
  border: 2px solid gray
  transition: .3s ease-out
  border-radius: 5px
  input
    width: 100%
    padding: 10px
    border: unset
    outline: none
    background-color: transparent
  &.error
    border-color: red
    color: red
    background-color: #ffc8c8
  &.focus
    border-color: black
</style>
