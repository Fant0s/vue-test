<script setup lang="ts">
import { AccountType } from '@/types/account.ts'
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface IProps {
  value: AccountType
  error: boolean
}
const props = withDefaults(defineProps<IProps>(), { error: false })

const emit = defineEmits<{
  (e: 'update:value', value: AccountType): void
}>()

const options = [AccountType.Local, AccountType.LDAP]
const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

const onClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))

const selectOption = (value: AccountType) => {
  emit('update:value', value)
  isOpen.value = false
}
</script>

<template>
  <div class="select" ref="selectRef">
    <div class="selected" @click="isOpen = !isOpen">{{ props.value || 'Выберите тип' }}</div>
    <transition name="fade">
      <div class="options" v-if="isOpen">
        <div
          class="option"
          :class="{ disabled: props.value === option }"
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="sass" scoped>
.select
  display: flex
  flex-direction: column
  position: relative
  border: 2px solid gray
  border-radius: 5px
  width: 100%
  height: 100%
  .selected
    display: flex
    width: 100%
    height: 100%
    padding: 10px
    font-size: 16px
  .options
    display: flex
    flex-direction: column
    width: calc(100% + 4px)
    position: absolute
    top: calc(100% + 3px)
    left: -2px
    background-color: #ededed
    border-radius: 5px
    border: 1px solid gray
    overflow: hidden
    z-index: 2
    .option
      padding: 5px 10px
      font-size: 16px
      border-bottom: 1px solid lightgray
      transition: .3s ease-out
      &.disabled
        pointer-events: none
        opacity: .4
      &:hover
        background-color: lightgray
      &:last-of-type
        border-bottom: unset
</style>
