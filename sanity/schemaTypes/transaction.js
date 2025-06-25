export default {
  name: 'transaction',
  title: 'Transaction',
  type: 'document',
  fields: [
    {
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'app',
      title: 'Application',
      type: 'reference',
      to: [{type: 'app'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'email',
      validation: Rule => Rule.required()
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'amount',
      title: 'Amount (USD)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Completed', value: 'completed'},
          {title: 'Failed', value: 'failed'},
          {title: 'Refunded', value: 'refunded'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          {title: 'Stripe', value: 'stripe'},
          {title: 'PayPal', value: 'paypal'},
          {title: 'Bank Transfer', value: 'bank_transfer'}
        ]
      }
    },
    {
      name: 'paymentGatewayId',
      title: 'Payment Gateway ID',
      type: 'string',
      description: 'ID from payment gateway (Stripe/PayPal)'
    },
    {
      name: 'downloadToken',
      title: 'Download Token',
      type: 'string',
      description: 'Unique token for secure download access'
    },
    {
      name: 'downloadExpiry',
      title: 'Download Expiry',
      type: 'datetime',
      description: 'When the download link expires'
    },
    {
      name: 'isDownloaded',
      title: 'Is Downloaded',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      description: 'Number of times the file was downloaded'
    },
    {
      name: 'lastDownloadedAt',
      title: 'Last Downloaded At',
      type: 'datetime'
    },
    {
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'Customer IP address for security'
    },
    {
      name: 'userAgent',
      title: 'User Agent',
      type: 'text',
      description: 'Customer browser/device info'
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes about the transaction'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    },
    {
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'transactionId',
      app: 'app.title',
      customer: 'customerName',
      amount: 'amount',
      status: 'status'
    },
    prepare(selection) {
      const {app, customer, amount, status} = selection
      return Object.assign({}, selection, {
        subtitle: `${app} - ${customer} - $${amount} (${status})`
      })
    }
  }
} 