import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { _type, _id, operation } = body

    console.log('Sanity webhook received:', { _type, _id, operation })

    // Revalidate berdasarkan tipe konten
    if (_type === 'blog') {
      revalidatePath('/blog')
      revalidatePath('/')
      revalidateTag('blog')
      
      // Revalidate halaman blog individual jika ada slug
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`)
      }
    }

    if (_type === 'project') {
      revalidatePath('/project')
      revalidatePath('/')
      revalidateTag('project')
      
      // Revalidate halaman project individual jika ada slug
      if (body.slug?.current) {
        revalidatePath(`/project/${body.slug.current}`)
      }
    }

    if (_type === 'app') {
      revalidatePath('/store')
      revalidateTag('app')
      
      // Revalidate halaman app individual jika ada slug
      if (body.slug?.current) {
        revalidatePath(`/store/${body.slug.current}`)
      }
    }

    if (_type === 'category') {
      revalidatePath('/store')
      revalidatePath('/blog')
      revalidateTag('category')
      revalidateTag('app')
      revalidateTag('blog')
    }

    if (_type === 'transaction') {
      revalidatePath('/store')
      revalidateTag('transaction')
    }

    // Revalidate homepage karena mungkin ada konten yang berubah
    revalidatePath('/')

    return NextResponse.json({ 
      message: 'Revalidated successfully',
      revalidated: true,
      now: Date.now()
    })

  } catch (error) {
    console.error('Error in Sanity webhook:', error)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'Sanity webhook endpoint is working',
    timestamp: new Date().toISOString()
  })
} 