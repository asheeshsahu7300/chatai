'use client'

import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

import { useEffect } from 'react'
import { useStytchUser } from '@stytch/nextjs'

import { redirect } from 'next/navigation'

export default function IndexPage() {
  const id = nanoid()
  const { user, isInitialized } = useStytchUser()

  useEffect(() => {
    if (!isInitialized || !user) {
      redirect('/sign-in')
    }
  }, [user, isInitialized])

  return <Chat id={id} />
}
