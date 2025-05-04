
const faqData = [
    {
      keywords: ['hi', 'hello', 'hey', 'hii', 'heyy', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste'],
      answer: 'Hello! 👋 I’m PassEase Assistant. How can I help you today? 😊'
    },
    {
      keywords: ['ok', 'okay', 'fine', 'got it', 'sure', 'kk', 'cool', 'alright', 'understood'],
      answer: 'Great! Let me know if you have any more questions. 😊'
    },
    {
      keywords: [
        'registration', 'register', 'signup', 'sign', 'up',
        'create', 'account', 'start', 'join', 'enroll',
        'process', 'procedure', 'how','to', 'apply',
      ],
      
      answer: 'You can register by clicking on "Register", then entering your name, email, password and uploading required documents. After verification, you’ll be successfully registered.'
    },
    {
      keywords: ['sign up', 'email', 'phone', 'number'],
      answer: 'Yes, both Mobile number and Email are required for backup and notifications.'
    },
    {
      keywords: ['register', 'someone', 'else', 'others', 'other', 'another', 'different'],
      answer: 'No, each user must register using their own mobile number to ensure authentication and avoid misuse.'
    },
    {
      keywords: ['email', 'already', 'registered', 'exists', 'used', 'taken', 'duplicate'],
      answer: 'Try logging in with the existing email or use a new email. If the issue persists, contact support.'
    },
    {
      keywords: ['registration', 'crash', 'crashing', 'failure', 'error', 'app issue'],
      answer: 'Try clearing your app cache or reinstalling the app. If it continues, report the issue via Help & Support.'
    },
    {
      keywords: ['form', 'not', 'submitting', 'submit', 'failed', 'error', 'issue', 'problem', 'unable', 'send', 'cant', 'cannot', 'submission', 'failure', 'working', 'doesn’t', 'stuck', 'does'],      answer: 'Ensure all mandatory fields are filled correctly and your documents are in the correct format. If the issue persists, refresh the app and try again.'
    },
    {
      keywords: ['pass', 'request', 'pending', 'waiting', 'approve', 'status', 'unresolved', 'delayed'],
      answer: 'Admin approval typically takes a few minutes to hours. If delayed beyond 24 hours, contact support.'
    },
    {
      keywords: ['how', 'pay', 'bus', 'pass', 'payment', 'buy', 'purchase'],
      answer: 'Once approved, you\'ll be directed to the Razorpay payment gateway where you can pay via UPI, debit/credit card, or net banking.'
    },
    {
      keywords: ['payment', 'options', 'supported', 'methods', 'pay', 'upi', 'cards', 'wallets', 'net banking', 'razorpay', 'supported methods', 'payment methods'],      
      answer: 'We support UPI, cards, wallets, net banking, and most major Indian payment methods through Razorpay.'
    },
    {
      keywords: ['receipt', 'payment', 'receive', 'digital receipt', 'email', 'confirmation', 'invoice'],
      answer: 'Yes, a digital receipt will be emailed to you and available in the "Payments" section of the app.'
    },
    {
      keywords: ['money', 'deducted', 'no', 'pass', 'payment', 'transaction', 'charged', 'failed', 'issue', 'support'],
      answer: 'Confirmation delays sometimes occur. Check again after a few minutes or contact support with your transaction ID.'
    },
    {
      keywords: ['razorpay', 'failed', 'transaction', 'payment', 'retry', 'overloaded', 'error', 'issue'],
      answer: 'Try another payment method or retry after a short while. Razorpay may be temporarily overloaded.'
    },
    {
      keywords: ['payment', 'processing', 'stuck', 'pending', 'wait', 'delay', 'issue', 'status', 'unresolved', 'transaction', 'support'],
      answer: 'Wait 15 minutes and check your pass status. If unresolved, contact support with your payment ID.'
    },
    {
      keywords: ['qr code', 'used', 'for', 'scan', 'bus pass', 'travel', 'verification', 'digital pass', 'bus conductor', 'pass', 'scan for', 'used for'],
      answer: 'The QR code is your digital bus pass. Bus conductors will scan it for verification during travel.'
    },    

    {
      keywords: ['unable', 'scan', 'cannot', 'scanning', 'issue', 'error', 'problem'],
      answer: 'Ensure you haven’t exceeded the 2-scan daily limit. Clear the app cache or reinstall the app. If issues persist, use the "Help" button for manual verification.'
    },

    {
      keywords: ['scan', 'qr', 'verification', 'qr code', 'scan qr', 'verification scan', 'scanning'],
      answer: 'Click the "Scan QR" button to access the scanning interface.'
    },
    {
      keywords: ['conductor', 'pass', 'invalid'],
      answer: 'Verify your pass hasn’t expired or exceeded usage limits. If valid, show the receipt or contact support.'
    },
    {
      keywords: ['qr', 'already used', 'not travelled', 'used', 'travelled', 'incident', 'technical glitch', 'problem', 'issue'],
      answer: 'This might be a technical glitch. Contact support with a screenshot and time of the incident.'
    },    
    {
      keywords: ['pass', 'validity', 'how long', 'duration', 'expiry', 'valid', 'time'],
      answer: 'Currently 30 days. Future updates will introduce more validity duration options.'
    },    
    {
      keywords: ['renew', 'pass', 'before expiry', 'early renewal', 'renewal', 'expiry'],
      answer: 'No, renewal is only possible after the existing pass expires.'
    },    
    {
      keywords: ['pass', 'expiry', 'notification', 'expire', 'expire notification', 'alert', 'reminder', 'expiry date'],
      answer: 'Yes, you’ll receive notifications 1-2 days before expiry.',
    },    
    {
      keywords: ['pass', 'expired', 'no alert', 'expiry', 'expired pass', 'alert', 'notification'],
      answer: 'Ensure app notifications are enabled. You can also check expiry dates in the "Dashboard" section.',
    },    
    {
      keywords: ['unable', 'renew', 'pass', 'cannot renew', 'renewal', 'expire', 'expired pass'],
      answer: 'The option appears only after expiry. Wait until the last day or contact support.',
    },

    {
      keywords: ['renewed', 'pass', 'date', 'not updating', 'refresh', 'cache', 'transaction ID', 'update issue'],
      answer: 'Refresh the app or clear the cache. If unresolved, contact support with your transaction ID.',
    },    

    {
      keywords: ['active', 'pass', 'check'],
      answer: 'Your active passes are visible in the "Dashboard" section.'
    },
    {
      keywords: ['customer', 'support', 'contact'],
      answer: 'Go to the "Help & Support" tab to chat, email, or call directly.'
    },
    {
      keywords: ['use', 'web', 'mobile'],
      answer: 'Yes, PassEase is available on Android/iOS apps and a web portal.'
    },
    {
      keywords: ['app', 'slow', 'unresponsive'],
      answer: 'Restart the app, close background apps, or check your internet connection.'
    },
    {
      keywords: ['dashboard', 'not loading'],
      answer: 'This is likely a connectivity issue. Switch to Wi-Fi or re-login.'
    },
    {
      keywords: ['notifications', 'not working'],
      answer: 'Enable notifications in both phone settings and the app (Settings > Notifications).'
    },
    {
      keywords: ['payment', 'information', 'safe'],
      answer: 'Yes, transactions are secured by Razorpay with end-to-end encryption and PCI-DSS compliance.'
    },
    {
      keywords: ['travel', 'history', 'visible'],
      answer: 'Only you and authorized admin staff. It is not publicly visible.'
    },
    {
      keywords: ['data', 'collected', 'passEase'],
      answer: 'We collect minimal necessary data: name, contact details, ID proof, and travel information.'
    },
    {
      keywords: ['complaint', 'raise'],
      answer: 'Go to "Help & Support" > "Feedback" and submit your complaint.'
    },
    {
      keywords: ['feedback', 'submit'],
      answer: 'Use the "Feedback" section in the app.'
    },
    {
      keywords: ['support', 'response', 'time'],
      answer: 'Average response time is under 24 hours. Critical issues are prioritized.'
    },
    {
      keywords: ['issue', 'not resolved', 'after 3 days'],
      answer: 'Reply to the same ticket ID for escalation. We apologize for the inconvenience.'
    },
    {
      keywords: ['support', 'no reply', 'messages', 'not responding'],
      answer: 'Check your internet connection and message status. If needed, email us directly.'
    },
    {
      keywords: ['no option', 'talk', 'human agent'],
      answer: 'Type "help" in the Help & Support chat to get phone numbers and email IDs of authorities.'
    },
    {
      keywords: ['support', 'channels', 'available', 'contact',],
      answer: 'In-app chat, email, and phone support.'
    },
    {
      keywords: ['documents','document', 'require', 'required','requirements', 'need', 'needed', 'need to upload', 'upload'],
      answer: 'You will need one Passport size photo, Aadhaar card, and Bonafide certificate from your college/school. If you are working, then a proof of employment is also required. 😊'
    },
    
];
  
export default faqData;

  