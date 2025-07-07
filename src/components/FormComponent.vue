<script setup lang="ts">
import { useAccountStore } from '@/stores/account.ts'
import AccountComponent from '@/components/AccountComponent.vue'
import { useModalsStore } from '@/stores/modals.ts'
import HintIcon from '@/components/icons/hintIcon.vue'

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
      <button class="add-account" @click="handleAddAccount" aria-label="add account">+</button>
    </div>
    <div class="hint">
      <hint-icon />
      <p>
        В поле <em>"Метка"</em> вводите текстовые метки через точку с запятой `;`. Максимум 50
        символов.
      </p>
    </div>
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
    display: flex
    flex-direction: row
    align-items: center
    gap: 20px
    .add-account
      display: flex
      justify-content: center
      align-items: center
      width: 40px
      height: 40px
      font-size: 24px
      border-radius: 10px
      border-color: #c0c0ff
      color: #0000ff
      background-color: transparent
      transition: .3s ease-out
      &:hover
        background-color: #c0c0ff
  .hint
    display: flex
    flex-direction: row
    gap: 10px
    align-items: center
    margin: 30px 0 20px
    padding: 15px
    border-radius: 10px
    background-color: rgba(203, 210, 255, 0.28)
    font-weight: 500
    svg
      width: 40px
      height: 40px
  .accounts-list
    border-collapse: collapse
    width: 100%
    thead
      .cell
        .cell-content
          display: flex
          padding: 0 5px 10px
          color: #989898
    .not-found
      display: flex
      justify-content: center
      padding: 120px
</style>
