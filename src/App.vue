<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
import { useModalsStore } from '@/stores/modals.ts'
import DeleteModal from '@/components/DeleteModal.vue'

const modalStore = useModalsStore()
</script>

<template>
  <main>
    <FormComponent />
  </main>

  <transition name="fade">
    <div class="modal-layer" v-if="modalStore.showedModal" @click="modalStore.closeModal()">
      <div class="modal-wrapper" @click.stop>
        <DeleteModal />
      </div>
    </div>
  </transition>
</template>

<style lang="sass" scoped>
.modal-layer
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 10
  .modal-wrapper
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    background-color: rgba(44, 62, 80, 0.55)
</style>
