import { NextResponse } from 'next/server'
import { getClosuresForProduct, isProductSlug } from '@/lib/availability'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productSlug = searchParams.get('productSlug') ?? ''

    if (!isProductSlug(productSlug)) {
      return NextResponse.json(
        { closures: [] },
        { headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const closures = await getClosuresForProduct(productSlug)

    return NextResponse.json(
      { closures },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return NextResponse.json(
      { closures: [] },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
