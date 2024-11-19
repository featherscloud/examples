import { createClient, LoginRequiredError } from '@featherscloud/auth'

export const appId = '<your-app-id>'

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
  try {
    const authHeader = await auth.getHeader()

    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: authHeader
      }
    })
  } catch (error) {
    if (error instanceof LoginRequiredError) {
      // Redirect to login page
      window.location.href = await auth.getLoginUrl(error)
    } else {
      throw error
    }
  }
}