'use client'
import { Button } from '@/components'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils'
type ClientButtonProps = React.ComponentProps<typeof Button>

/* ========================================================================

======================================================================== */

export const ClientButton = ({
  children,
  className = '',
  ...otherProps
}: ClientButtonProps) => {
  const router = useRouter()
  return (
    <Button
      className={cn(className)}
      onClick={() => {
        router.push('/about')
      }}
      size='sm'
      {...otherProps}
    >
      {children}
    </Button>
  )
}
