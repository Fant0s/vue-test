<script setup lang="ts">
import { ref } from 'vue'
import PasswordVisibilityIcon from '@/components/icons/passwordVisibilityIcon.vue'

interface IProps {
  name: string
  value: string | null
  type: 'login' | 'password' | 'marks'
  error?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  value: '',
  error: false,
})

const emit = defineEmits<{
  (e: 'update:value', value: string | null): void
}>()

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
      :name="name"
      :value="props.value"
      placeholder="Значение"
      :type="props.type === 'password' ? inputType : props.type"
      @focus="isFocused = true"
      @blur="handleLoseFocus"
      @input="emit('update:value', ($event.target as HTMLInputElement).value)"
    />
    <template v-if="props.type === 'password'">
      <button class="visible" @click="toggleVisibility">
        <PasswordVisibilityIcon :is-showed="inputType === 'password'" />
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
  width: 100%
  height: 100%
  input
    width: 100%
    height: 100%
    padding: 10px
    border: unset
    outline: none
    background-color: transparent
    font-size: 16px
  &.error
    border-color: red
    color: red
    background-color: #ffc8c8
  &.focus
    border-color: black
</style>
