'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StytchProvider } from '@stytch/nextjs'
import { createStytchUIClient } from '@stytch/nextjs/ui'

const stytch = createStytchUIClient(
  'public-token-test-a13eee74-0f97-4150-a6aa-56ccd2cde2cf'
)

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <StytchProvider stytch={stytch}>
        <SidebarProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </SidebarProvider>
      </StytchProvider>
    </NextThemesProvider>
  )
}
