/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const GalleryController = () => import('#controllers/galleries_controller')
const WeddingController = () => import('#controllers/wedding_controller')

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/google/redirect', [AuthController, 'googleRedirect'])
router.get('/google/callback', [AuthController, 'googleCallback'])
router
  .get('/auth', async ({ auth }) => {
    return auth.user!
  })
  .use(middleware.auth())

router
  .post('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  })
  .use(middleware.auth())

// Gallery routes
router
  .group(() => {
    router.get('galleries', [GalleryController, 'index'])
    router.post('galleries', [GalleryController, 'store'])
    router.get('galleries/:id', [GalleryController, 'show'])
    router.put('galleries/:id', [GalleryController, 'update'])
    router.delete('galleries/:id', [GalleryController, 'destroy'])
  })
  .use(middleware.auth())

// WeddingData routes
router
  .group(() => {
    router.get('wedding', [WeddingController, 'index'])
    router.post('wedding', [WeddingController, 'store'])
    router.get('wedding/:id', [WeddingController, 'show'])
    router.put('wedding/:id', [WeddingController, 'update'])
    router.delete('wedding/:id', [WeddingController, 'destroy'])
  })
  .use(middleware.auth())
