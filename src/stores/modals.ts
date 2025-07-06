import { ref } from 'vue'
import { defineStore } from 'pinia'

type TDeleteModal = { type: 'delete'; data: Record<string, number> }

type TModals = TDeleteModal

export const useModalsStore = defineStore('modals', () => {
  const showedModal = ref<TModals | null>(null)

  const setShowedModal = (value: TModals) => {
    showedModal.value = value
  }

  const closeModal = () => {
    showedModal.value = null
  }

  return { showedModal, setShowedModal, closeModal }
})
