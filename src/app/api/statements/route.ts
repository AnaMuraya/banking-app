import { accountStatement } from '@/app/api/data'

export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  return Response.json({ accountStatement })
}
