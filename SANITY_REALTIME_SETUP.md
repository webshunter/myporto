# Sanity Real-Time Updates Setup

## Overview
This setup enables real-time updates from Sanity CMS to your Next.js application. When content is updated in Sanity Studio, the changes will be reflected immediately on your website.

## Features
- ✅ Real-time data synchronization
- ✅ Webhook-based revalidation
- ✅ Client-side live updates
- ✅ Fallback to CDN for performance
- ✅ Automatic cache invalidation

## Setup Instructions

### 1. Environment Variables
Add the following to your `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your_sanity_api_token"

# Base URL for webhooks
BASE_URL="https://yourdomain.com"
```

### 2. Get Sanity API Token
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API section
4. Create a new token with read permissions
5. Copy the token to your `.env.local`

### 3. Setup Sanity Webhook
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API section → Webhooks
4. Create a new webhook with these settings:

**URL:**
```
https://yourdomain.com/api/sanity-webhook
```

**Dataset:** `production`

**Filter:**
```groq
(_type == "blog" || _type == "project" || _type == "app" || _type == "transaction")
```

**HTTP Method:** `POST`

### 4. Usage

#### Server-Side (Recommended for SEO)
```javascript
import { getAllPosts } from '@/lib/sanity'

export default async function BlogPage() {
  const posts = await getAllPosts() // Uses revalidation
  // ...
}
```

#### Client-Side (Real-time updates)
```javascript
'use client'
import { useBlogLive } from '@/lib/useSanityLive'

export default function BlogLivePage() {
  const { data: posts } = useBlogLive()
  // ...
}
```

## How It Works

### 1. Dual Client Strategy
- **CDN Client**: Fast responses using `useCdn: true`
- **Live Client**: Real-time updates using `useCdn: false`

### 2. Revalidation Process
1. Content updated in Sanity Studio
2. Webhook triggers `/api/sanity-webhook`
3. Next.js revalidates affected pages
4. New content served immediately

### 3. Client-Side Updates
1. React hook subscribes to Sanity real-time API
2. Changes received via WebSocket
3. UI updates automatically
4. No page refresh needed

## API Endpoints

### Webhook Endpoint
- **URL**: `/api/sanity-webhook`
- **Method**: `POST`
- **Purpose**: Handle Sanity webhook notifications

### Testing Webhook
```bash
curl -X GET https://yourdomain.com/api/sanity-webhook
```

## Performance Considerations

### CDN vs Real-time
- **CDN**: Fast, cached responses (useCdn: true)
- **Real-time**: Fresh data, slightly slower (useCdn: false)

### Best Practices
1. Use server-side rendering for initial load
2. Enable client-side updates for real-time experience
3. Implement proper error handling
4. Monitor webhook performance

## Troubleshooting

### Common Issues

1. **Webhook not triggering**
   - Check webhook URL is correct
   - Verify API token has read permissions
   - Check server logs for errors

2. **Real-time updates not working**
   - Ensure SANITY_API_TOKEN is set
   - Check browser console for errors
   - Verify network connectivity

3. **Performance issues**
   - Monitor webhook frequency
   - Implement rate limiting if needed
   - Use CDN for static content

### Debug Mode
Enable debug logging by adding to your component:

```javascript
console.log('Live update received:', update)
```

## Security Notes

1. **API Token**: Keep your Sanity API token secure
2. **Webhook Validation**: Consider implementing webhook signature validation
3. **Rate Limiting**: Monitor webhook frequency to prevent abuse

## Monitoring

### Webhook Health
Check webhook status in Sanity dashboard:
- Go to API → Webhooks
- View delivery status and logs

### Application Logs
Monitor your application logs for:
- Webhook reception
- Revalidation success/failure
- Real-time connection status

## Next Steps

1. Test webhook setup with content updates
2. Monitor performance and adjust as needed
3. Implement additional content types as required
4. Consider implementing webhook signature validation for production 