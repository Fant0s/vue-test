<script setup lang="ts">
import { useAccountStore } from '@/stores/account.ts'
import { computed } from 'vue'
import { useModalsStore } from '@/stores/modals.ts'

const store = useAccountStore()
const modalStore = useModalsStore()

const deleteID = computed(() => (modalStore.showedModal ? modalStore.showedModal.data.id : null))

const confirmDelete = () => {
  if (deleteID.value) {
    store.removeAccount(deleteID.value)
    modalStore.closeModal()
  }
}
</script>

<template>
  <div class="modal">
    <p class="text">
      Вы действительно хотите удалить аккаунт с ID:<strong>{{ deleteID }}</strong
      >?
    </p>
    <div class="actions">
      <button class="btn delete" @click="confirmDelete">Да</button>
      <button class="btn cancel" @click="modalStore.closeModal()">Нет</button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.modal
  display: flex
  flex-direction: column
  gap: 20px
  background-color: white
  border-radius: 20px
  padding: 20px
  .text
    font-size: 18px
    font-weight: 500
  .actions
    display: flex
    flex-direction: row
    align-items: center
    gap: 20px
    .btn
      display: flex
      justify-content: center
      align-items: center
      padding: 10px 20px
      border-radius: 10px
      transition: .3s ease-out
      border: 0
      font-size: 14px
      width: 100px
      &.delete
        background-color: #ffd6d6
        &:hover
          background-color: red
          color: white
      &.cancel
        background-color: #d5d5d5
        &:hover
          background-color: #919191
          color: white
</style>
