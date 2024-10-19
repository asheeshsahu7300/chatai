import { type Message } from 'ai'
import type { User } from '@stytch/vanilla-js'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export type SWRUser =
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
