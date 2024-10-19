'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { type Chat } from '@/lib/types'

import { cookies } from 'next/headers'

import loadStytch from 'lib/loadStytch'

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const stytch = loadStytch()

  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('stytch_session')

  if (!sessionCookie) {
    return {
      error: 'Unauthorized'
    }
  }

  const session = await stytch.sessions.authenticate({
    session_token: sessionCookie.value
  })

  if (!session?.user) {
    return {
      error: 'Unauthorized'
    }
  }

  const userId = session.user.user_id

  const uid = await kv.hget<string>(`chat:${id}`, 'userId')

  if (uid !== session?.user?.user_id) {
    return {
      error: 'Unauthorized'
    }
  }

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${session.user.user_id}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const stytch = loadStytch()

  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('stytch_session')

  if (!sessionCookie) {
    return {
      error: 'Unauthorized'
    }
  }

  const session = await stytch.sessions.authenticate({
    session_token: sessionCookie.value
  })

  if (!session?.user) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await kv.zrange(
    `user:chat:${session.user.user_id}`,
    0,
    -1
  )
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.user_id}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {
  const stytch = loadStytch()

  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('stytch_session')

  if (!sessionCookie) {
    return {
      error: 'Unauthorized'
    }
  }

  const session = await stytch.sessions.authenticate({
    session_token: sessionCookie.value
  })

  if (!session?.user) {
    return {
      error: 'Unauthorized'
    }
  }

  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || chat.userId !== session.user.user_id) {
    return {
      error: 'Something went wrong'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}
