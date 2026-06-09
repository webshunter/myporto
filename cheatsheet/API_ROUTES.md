# API Routes & Integration Cheat Sheet

## 🌐 API Routes Overview

### Route Structure
```
app/api/
├── download/route.js              # App download handler
├── payment/
│   ├── confirm-payment/route.js   # Payment confirmation
│   └── create-payment-intent/route.js  # Stripe payment intent
├── post/route.js                  # Portfolio data
└── sanity-webhook/route.js        # Cache invalidation
```

---

## 📥 Download API

### Endpoint: `POST /api/download`

**Purpose**: Handle secure app downloads with token validation

**Request Body**:
```json
{
  "token": "download-token-string",
  "transactionId": "txn-123456"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "downloadUrl": "https://drive.google.com/...",
  "message": "Download started"
}
```

**Response (Error)**:
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Flow**:
1. Validate download token
2. Check token expiry
3. Verify transaction status
4. Increment download count
5. Return download URL

---

## 💳 Payment APIs

### 1. Create Payment Intent

**Endpoint**: `POST /api/payment/create-payment-intent`

**Purpose**: Create Stripe PaymentIntent for paid apps

**Request Body**:
```json
{
  "appId": "app-slug",
  "appTitle": "My Awesome App",
  "amount": 29.99,
  "customerEmail": "customer@email.com",
  "customerName": "John Doe"
}
```

**Response (Success)**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

**Response (Error)**:
```json
{
  "error": "Missing required fields"
}
```

**Implementation**:
```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { appId, appTitle, amount, customerEmail, customerName } = await request.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      appId,
      appTitle,
      customerEmail,
      customerName
    },
    description: `Purchase: ${appTitle}`,
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id
  });
}
```

### 2. Confirm Payment

**Endpoint**: `POST /api/payment/confirm-payment`

**Purpose**: Verify payment and create transaction record

**Request Body**:
```json
{
  "paymentIntentId": "pi_xxx",
  "appId": "app-slug",
  "customerEmail": "customer@email.com",
  "customerName": "John Doe",
  "amount": 29.99
}
```

**Response (Success)**:
```json
{
  "success": true,
  "transactionId": "txn-123456",
  "downloadToken": "token-xyz",
  "downloadUrl": "/api/download"
}
```

**Flow**:
1. Verify payment with Stripe
2. Create transaction in Sanity
3. Generate download token
4. Return transaction details

---

## 📝 Post API

### Endpoint: `GET /api/post`

**Purpose**: Fetch portfolio data for homepage

**Query Parameters**:
- `v` (optional): Timestamp for cache busting

**Response**:
```json
{
  "name": "Gugus Darmayanto",
  "headtitle": "Programmer & Developer",
  "email": "email@example.com",
  "github": "webshunter",
  "foto": "https://cdn.sanity.io/...",
  "description": "...",
  "location": "Indonesia",
  "linkcv": "https://...",
  "language": "Indonesian, English",
  "experience": [...],
  "education": [...],
  "services": [...],
  "skills": [...],
  "project": [...]
}
```

**Implementation**:
```javascript
export async function GET(request) {
  const query = `*[_type == "portofolio"][]{
    name,
    headtitle,
    email,
    github,
    'foto' : image.asset->url,
    description,
    location,
    linkcv,
    language,
    'experience': experience[]->{...},
    'education': education[]->{...},
    'services': services[]->{...},
    'skills': skills[]->{...},
    'project' : project[]->{...}
  }`

  const data = await client.fetch(query)
  return NextResponse.json(data[0])
}
```

---

## 🔄 Sanity Webhook

### Endpoint: `POST /api/sanity-webhook`

**Purpose**: Invalidate cache when Sanity content changes

**Request Body** (from Sanity):
```json
{
  "_type": "blog",
  "_id": "post-123",
  "operation": "update",
  "slug": {
    "current": "my-blog-post"
  }
}
```

**Response (Success)**:
```json
{
  "message": "Revalidated successfully",
  "revalidated": true,
  "now": 1234567890
}
```

**Revalidation Logic**:
```javascript
if (_type === 'blog') {
  revalidatePath('/blog')
  revalidatePath('/')
  revalidateTag('blog')
  
  if (body.slug?.current) {
    revalidatePath(`/blog/${body.slug.current}`)
  }
}

if (_type === 'project') {
  revalidatePath('/project')
  revalidatePath('/')
  revalidateTag('project')
  
  if (body.slug?.current) {
    revalidatePath(`/project/${body.slug.current}`)
  }
}

if (_type === 'app') {
  revalidatePath('/store')
  revalidateTag('app')
  
  if (body.slug?.current) {
    revalidatePath(`/store/${body.slug.current}`)
  }
}
```

**Content Type → Paths Mapping**:

| Content Type | Revalidated Paths | Tags |
|-------------|------------------|------|
| blog | `/blog`, `/blog/[slug]`, `/` | `blog` |
| project | `/project`, `/project/[slug]`, `/` | `project` |
| app | `/store`, `/store/[slug]` | `app` |
| category | `/store`, `/blog` | `category`, `app`, `blog` |
| transaction | `/store` | `transaction` |

---

## 🔐 Security Considerations

### Download Token Security
- Generate unique tokens per transaction
- Set expiry time (e.g., 24 hours)
- Track download attempts
- Validate IP address
- Log user agent

### Payment Security
- Use HTTPS in production
- Validate Stripe signatures
- Sanitize all inputs
- Log all transactions
- Rate limiting on endpoints

### Environment Variables
```env
# Required
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
SANITY_API_TOKEN=...

# Optional (for Midtrans)
MIDTRANS_SERVER_KEY=...
MIDTRANS_CLIENT_KEY=...
```

---

## 🧪 Testing APIs

### Test with cURL

#### Test Download API
```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"token":"test-token","transactionId":"txn-123"}'
```

#### Test Payment Intent
```bash
curl -X POST http://localhost:3000/api/payment/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "appId":"my-app",
    "appTitle":"Test App",
    "amount":29.99,
    "customerEmail":"test@example.com",
    "customerName":"Test User"
  }'
```

#### Test Sanity Webhook
```bash
curl -X POST http://localhost:3000/api/sanity-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "_type":"blog",
    "_id":"test-123",
    "operation":"update",
    "slug":{"current":"test-post"}
  }'
```

---

## 📊 Error Handling

### Standard Error Response
```javascript
return NextResponse.json(
  { 
    error: 'Error message',
    details: 'Optional details'
  },
  { status: 400 }
)
```

### Common Status Codes
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Error Handling Pattern
```javascript
export async function POST(request) {
  try {
    // Validate input
    const body = await request.json()
    if (!body.requiredField) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      )
    }

    // Process request
    const result = await processRequest(body)

    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 🔄 Payment Flow (Complete)

### Step-by-Step Flow

```
1. User clicks "Buy Now" on app detail page
   ↓

2. User fills purchase form
   - Name, email
   - Payment details
   ↓

3. Frontend calls POST /api/payment/create-payment-intent
   Request: { appId, appTitle, amount, customerEmail, customerName }
   Response: { clientSecret, paymentIntentId }
   ↓

4. Frontend uses Stripe.js with clientSecret
   - Shows Stripe checkout modal
   - User enters payment info
   - Stripe processes payment
   ↓

5. On successful payment
   - Frontend calls POST /api/payment/confirm-payment
   - Verifies payment with Stripe
   - Creates transaction in Sanity
   - Generates download token
   ↓

6. User redirected to download page
   - Uses download token
   - Calls POST /api/download
   - Receives download URL
   - Downloads app
   ↓

7. Transaction tracking
   - Download count incremented
   - Last downloaded timestamp updated
   - Transaction status set to "completed"
```

---

## 📝 Integration Examples

### Frontend: Stripe Payment
```javascript
import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

async function handlePayment(app) {
  // Create payment intent
  const response = await fetch('/api/payment/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      appId: app.slug.current,
      appTitle: app.title,
      amount: app.price,
      customerEmail: email,
      customerName: name
    })
  })

  const { clientSecret } = await response.json()

  // Confirm payment
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/store/${app.slug.current}/success`,
    },
  })

  if (error) {
    console.error('Payment failed:', error)
  }
}
```

### Backend: Create Transaction in Sanity
```javascript
import { liveClient } from '@/lib/sanity'

async function createTransaction(data) {
  const transaction = {
    _type: 'transaction',
    transactionId: `txn-${Date.now()}`,
    app: { _type: 'reference', _ref: data.appId },
    customerEmail: data.customerEmail,
    customerName: data.customerName,
    amount: data.amount,
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'stripe',
    paymentGatewayId: data.paymentIntentId,
    downloadToken: generateToken(),
    downloadExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    isDownloaded: false,
    downloadCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  return await liveClient.create(transaction)
}

function generateToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}
```

---

## 🔍 Debugging Tips

### Log API Requests
```javascript
console.log('API Request:', {
  method: request.method,
  url: request.url,
  body: await request.json()
})
```

### Test Sanity Connection
```javascript
import { client } from '@/lib/sanity'

const test = await client.fetch('*[_type == "blog"][0]')
console.log('Sanity test:', test)
```

### Check Environment Variables
```javascript
console.log('Stripe key configured:', !!process.env.STRIPE_SECRET_KEY)
console.log('Sanity project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
```

---

## 📖 Resources

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Sanity Webhooks](https://www.sanity.io/docs/webhooks)
- [Next.js Revalidation](https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation)
