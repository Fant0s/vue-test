<script setup lang="ts">
import { ref } from 'vue'

interface IProps {
  type: 'login' | 'password' | 'marks'
  error?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  error: false,
})

const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const inputType = ref<'password' | 'text'>('password')
const toggleVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}

const loseFocus = () => {}
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
      @blur="loseFocus"
    />
    <template v-if="props.type === 'password'">
      <button class="visible" @click="toggleVisibility">
        {{ inputType === 'password' ? 'show' : 'hide' }}
      </button>
    </template>
  </div>
</template>

<style scoped></style>
