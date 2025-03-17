import { Skeleton } from '@/components/skeleton'

/* ========================================================================

======================================================================== */

export const SkeletonDemo = () => {
  return (
    <div className='mx-auto mb-6 max-w-[400px] rounded-lg border bg-(--background-light) p-4 shadow'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </div>
  )
}
