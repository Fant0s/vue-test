<script setup lang="ts">
import { useAccountStore } from '@/stores/account.ts'
import AccountComponent from '@/components/AccountComponent.vue'

const store = useAccountStore()

const handleAddAccount = () => {
  store.addAccount()
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
      <AccountComponent v-for="account in store.list" :key="account.id" />
    </div>
  </div>
</template>

<style scoped></style>
