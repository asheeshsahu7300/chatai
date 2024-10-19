'use client'

import React from 'react'
import { StytchLogin } from '@stytch/nextjs'

import { Products } from '@stytch/vanilla-js'
import { OAuthProviders } from '@stytch/vanilla-js'
import type { User } from '@stytch/vanilla-js'

import { getDomainFromWindow } from 'lib/utils'

type SWRUser =
  | {
      user: null
      fromCache: false
      isInitialized: false
    }
  | {
      user: User | null
      fromCache: boolean
      isInitialized: true
    }

const Login = () => {
  const styles = {
    container: {
      width: '600px'
    },
    buttons: {
      primary: {
        backgroundColor: '#000000',
        borderColor: '#000000'
      }
    }
  }

  const config = {
    products: [Products.emailMagicLinks, Products.oauth],
    emailMagicLinksOptions: {
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      loginExpirationMinutes: 60,
      signupRedirectURL: getDomainFromWindow() + '/authenticate',
      signupExpirationMinutes: 60
    },
    oauthOptions: {
      providers: [
        { type: OAuthProviders.Google },
        { type: OAuthProviders.Github }
      ],
      loginRedirectURL: getDomainFromWindow() + '/authenticate',
      signupRedirectURL: getDomainFromWindow() + '/authenticate'
    }
  }

  return <StytchLogin config={config} styles={styles} />
}

export default Login
