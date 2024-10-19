import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconExternalLink } from '@/components/ui/icons'

import { useStytch, useStytchSession, useStytchUser } from '@stytch/nextjs'

import type { User } from '@stytch/vanilla-js'

export function UserMenu({ user }: { user: User }) {
  const stytch = useStytch()
  const { session } = useStytchSession()

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <span className="ml-2">{user.emails[0].email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">Hi there,</div>
            <div className="text-xs text-zinc-500">{user.emails[0].email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-xs"
            onClick={() => {
              stytch.session.revoke()
            }}
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
