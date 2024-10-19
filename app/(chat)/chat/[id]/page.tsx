import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { cookies } from 'next/headers'

import loadStytch from 'lib/loadStytch'

import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const stytch = loadStytch()

  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('stytch_session')

  if (!sessionCookie) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const session = await stytch.sessions.authenticate({
    session_token: sessionCookie.value
  })

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.user_id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const stytch = loadStytch()

  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('stytch_session')

  if (!sessionCookie) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const session = await stytch.sessions.authenticate({
    session_token: sessionCookie.value
  })

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id, session.user.user_id)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.user_id) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
