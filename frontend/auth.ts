import { createClient, LoginRequiredError } from '@featherscloud/auth'

/**
 * The public application identifier for your Feathers app.
 * You can change the login page theme and other settings at
 * https://app.feathers.dev/app/<your-app-id>
 */
export const appId = '<your-app-id>'

/**
 * The Feathers auth client instance. Use it to get the current user,
 * the current token, and to log in and log out.
 */
export const auth = createClient({ appId })

/**
 * Make an authenticated request using the fetch API or
 * redirect to the login page if the user needs to log in.
 *
 * @param url The URL for the request
 * @param options Additional request options.
 * @returns The fetch response
 */
export async function authFetch(url: string, options?: RequestInit) {
  const headers = new Headers(options?.headers)

  try {
    // Set the authorization header with the Feathers Auth token
    headers.set('Authorization', await auth.getHeader())
  }
  catch (error) {
    if (error instanceof LoginRequiredError) {
      // Redirect to login page if a login is required
      window.location.href = await auth.getLoginUrl(error)
    }
    else {
      // Throw any other error
      throw error
    }
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
