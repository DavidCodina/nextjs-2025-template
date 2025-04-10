import { sleep } from '@/utils'

/* ========================================================================

======================================================================== */

export const DataComponent = async () => {
  await sleep(1000 * 3)
  return <div> Data Fetched...</div>
}
