import { getPortfolio } from '@/lib/sanity'

export async function GET() {
  try {
    const portfolio = await getPortfolio()
    return new Response(JSON.stringify(portfolio), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 })
  }
}
