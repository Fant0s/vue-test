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
      <h1 class="page-title">Учетные записи</h1>
      <button class="add-account" @click="handleAddAccount">+</button>
    </div>
    <p class="hint">
      <strong>Подсказка:</strong> В поле <em>"Метка"</em> вводите текстовые метки через точку с
      запятой `;`. Максимум 50 символов.
    </p>
    <table class="accounts-list">
      <template v-if="store.list.length">
        <thead>
          <tr>
            <th class="cell"><div class="cell-content">Метки</div></th>
            <th class="cell"><div class="cell-content">Типа записи</div></th>
            <th class="cell"><div class="cell-content">Логин</div></th>
            <th class="cell"><div class="cell-content">Пароль</div></th>
            <th class="cell"><div class="cell-content"></div></th>
          </tr>
        </thead>
        <tbody>
          <AccountComponent
            v-for="account in store.list"
            :key="account.id"
            :account="account"
            @delete="(id: number) => handleRemoveAccount(id)"
          />
        </tbody>
      </template>
      <template v-else>
        <p class="not-found">Ничего не найдено</p>
      </template>
    </table>
  </div>
</template>

<style lang="sass" scoped>
.form
  .top
    .page-title
    .add-account
  .hint
  .accounts-list
    border-collapse: collapse
    width: 100%
    thead
      .cell
        .cell-content
          display: flex
          padding: 0 5px
    .not-found
      display: flex
      justify-content: center
      padding: 120px
</style>
