import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async googleRedirect({ally}: HttpContext) {
        return ally.use('google').redirect()

      }

    async googleCallback({ally, auth, response}: HttpContext){
        const gg = ally.use('google')

        if (gg.accessDenied()) {
          return 'You have cancelled the login process'
        }
      
        /**
         * OAuth state verification failed. This happens when the
         * CSRF cookie gets expired.
         */
        if (gg.stateMisMatch()) {
          return 'We are unable to verify the request. Please try again'
        }
      
        /**
         * GitHub responded with some error
         */
        if (gg.hasError()) {
          return gg.getError()
        }
      
        /**
         * Access user info
         */
        const googleUser = await gg.user()
        const user = await User.findBy('email', googleUser.email)
        if(!user){
            const createdUser = await User.create({
                name: googleUser.name,
                email: googleUser.email,
                avatarUrl: googleUser.avatarUrl,
              })
            await auth.use('web').login(createdUser)
            return response.status(200)
        }
        await auth.use('web').login(user)
        return response.status(200)


    }
}