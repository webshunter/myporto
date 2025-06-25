# Midtrans Integration Guide

## Overview
This document outlines the plan for integrating Midtrans payment gateway into the GStore app store system.

## Current State
- All apps are currently available for free download
- Download system is fully functional with token-based security
- Transaction tracking is in place
- Ready for payment integration

## Midtrans Integration Plan

### 1. Environment Variables
Add to `.env.local`:
```env
# Midtrans Configuration
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_MERCHANT_ID=your_merchant_id
MIDTRANS_IS_PRODUCTION=false  # Set to true for production
```

### 2. Install Midtrans SDK
```bash
npm install midtrans-client
```

### 3. API Routes to Create

#### `/api/payment/midtrans/create-transaction`
```javascript
// Create Midtrans transaction
// Generate snap token
// Return snap token to frontend
```

#### `/api/payment/midtrans/notification`
```javascript
// Handle Midtrans payment notifications
// Update transaction status
// Generate download token on success
```

#### `/api/payment/midtrans/status`
```javascript
// Check payment status
// Return transaction details
```

### 4. Frontend Changes

#### Update AppPurchaseForm.jsx
- Replace free download logic with Midtrans integration
- Add payment method selection
- Handle payment status updates
- Show payment instructions

#### Update AppCard.jsx
- Show actual price for paid apps
- Different button text for free vs paid
- Price badge styling

### 5. Payment Flow

#### For Free Apps:
1. User fills form
2. Direct download with token
3. Transaction recorded

#### For Paid Apps:
1. User fills form
2. Create Midtrans transaction
3. Redirect to Midtrans payment page
4. User completes payment
5. Midtrans sends notification
6. Generate download token
7. User can download

### 6. Payment Methods Supported
- Bank Transfer (BCA, BNI, BRI, Mandiri)
- E-Wallet (GoPay, OVO, DANA, LinkAja)
- Credit/Debit Card
- Convenience Store (Indomaret, Alfamart)
- QRIS

### 7. Transaction Status Flow
```
pending → success/failed → download_available
```

### 8. Security Considerations
- Validate Midtrans signatures
- Use HTTPS in production
- Sanitize all inputs
- Log all transactions
- Rate limiting on API endpoints

### 9. Testing
- Use Midtrans sandbox environment
- Test all payment methods
- Test failed payments
- Test notification handling
- Test download token generation

### 10. Production Checklist
- [ ] Midtrans production account
- [ ] SSL certificate
- [ ] Domain verification
- [ ] Webhook URL configuration
- [ ] Error handling
- [ ] Monitoring setup
- [ ] Backup procedures

## Implementation Steps

### Phase 1: Setup
1. Create Midtrans account
2. Get API keys
3. Install SDK
4. Setup environment variables

### Phase 2: Backend
1. Create API routes
2. Implement transaction creation
3. Handle notifications
4. Update download logic

### Phase 3: Frontend
1. Update purchase form
2. Add payment UI
3. Handle payment flow
4. Update app cards

### Phase 4: Testing
1. Sandbox testing
2. Payment method testing
3. Error scenario testing
4. Security testing

### Phase 5: Production
1. Production environment setup
2. Domain verification
3. Webhook configuration
4. Go live

## Code Structure

### Current Files to Modify:
- `app/store/[slug]/AppPurchaseForm.jsx`
- `app/store/AppCard.jsx`
- `app/store/[slug]/page.jsx`
- `app/api/download/route.js`

### New Files to Create:
- `app/api/payment/midtrans/create-transaction/route.js`
- `app/api/payment/midtrans/notification/route.js`
- `app/api/payment/midtrans/status/route.js`
- `lib/midtrans.js`

## Benefits of Midtrans
- Indonesian payment gateway
- Multiple payment methods
- Good documentation
- Reliable service
- Competitive pricing
- Local support

## Cost Considerations
- Midtrans transaction fees
- Development time
- Testing costs
- Maintenance overhead

## Timeline Estimate
- Setup: 1-2 days
- Backend development: 3-5 days
- Frontend integration: 2-3 days
- Testing: 2-3 days
- Production deployment: 1 day

**Total: 9-14 days** 