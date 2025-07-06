<script setup lang="ts">
import { useAccountStore } from '@/stores/account.ts'
import AccountComponent from '@/components/AccountComponent.vue'
import { useModalsStore } from '@/stores/modals.ts'

const store = useAccountStore()
const modalStore = useModalsStore()

const handleAddAccount = () => {
  store.addAccount()
}
const handleRemoveAccount = (id: number) => {
  modalStore.setShowedModal({ type: 'delete', data: { id: id } })
}
</script>

<template>
  <div class="form">
    <div class="top">
      <h1>Учетные записи</h1>
      <button class="add-account" @click="handleAddAccount">+</button>
    </div>
    <p class="hint">
      <strong>Подсказка:</strong> В поле <em>"Метка"</em> вводите текстовые метки через точку с
      запятой `;`. Максимум 50 символов.
    </p>
    <div class="accounts-list">
      <template v-if="store.list.length">
        <AccountComponent
          v-for="account in store.list"
          :key="account.id"
          :account="account"
          @delete="(id: number) => handleRemoveAccount(id)"
        />
      </template>
      <template v-else>
        <p class="not-found">Ничего не найдено</p>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
