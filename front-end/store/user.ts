import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    isLogged: false,
    data: {
      id: null,
      name: null,
      avatarUrl: null,
      email: null
    }
  }), actions: {
    async refresh() {
      const headers = useRequestHeaders(['cookie'])
      const { data: response, status: status }: {
        data: any
        status: any
      } = await useFetch(`${useRuntimeConfig().public.apiUrl}/auth`, {
        headers, credentials: 'include'
      })
      if (status.value === 'error') {
        this.isLogged = false
        return
      }
      this.data = response.value
      this.isLogged = true
    },

    async logOut() {
      await $fetch(`${useRuntimeConfig().public.apiUrl}/logout`, {
        method: 'POST', credentials: 'include'
      })
      this.isLogged = false
      await navigateTo('/')
    },

    async deleteUser() {
      await $fetch(`${useRuntimeConfig().public.apiUrl}/auth/delete`, {
        method: 'DELETE', credentials: 'include'
      })
      this.isLogged = false
      await navigateTo('/')
    }
  }
})
