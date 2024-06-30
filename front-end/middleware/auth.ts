import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()
  await userStore.refresh()
  if (!userStore.isLogged) {
    return navigateTo('/login')
  }
})
