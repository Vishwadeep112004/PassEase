
// const faqData = [
//     {
//       question: "Hello",
//       answer: "Hello there! Welcome to PassEase, a smart bus pass system."
//     },
//     {
//       question: "Hey",
//       answer: "Welcome to PassEase, a smart bus pass system."
//     },
//     {
//       question: "Hi",
//       answer: "Welcome to PassEase, a smart bus pass system."
//     },
//     {
//       question: "Help",
//       answer: "Contact MSRTC via email or phone: 23075539 / 23024004. Alternatively, visit the official MSRTC website."
//     },
//     {
//       question: "How do I register on PassEase?",
//       answer: "You can register by clicking on \"Register\" then entering your name, email, password and uploading required documents. After that you can click on register. After the documents are verified, you will be registered."
//     },
//     {
//       question: "Do I need an email or phone number to sign up?",
//       answer: "Yes, both Mobile number and Email are required for backup and notifications."
//     },
//     {
//       question: "Can I use my student/employee ID to register?",
//       answer: "Yes, during registration or pass application, you may be asked to upload your student/employee ID as verification proof."
//     },
//     {
//       question: "Can I register on behalf of someone else?",
//       answer: "No, each user must register using their own mobile number to ensure authentication and avoid misuse."
//     },
//     {
//       question: "The app says my email is already registered.",
//       answer: "Try logging in with the existing email or use a new email. If the issue persists, contact support."
//     },
//     {
//       question: "I can't complete my registration---it keeps crashing.",
//       answer: "Try clearing your app cache or reinstalling the app. If it continues, report the issue via Help & Support."
//     },
//     {
//       question: "How do I apply for a new bus pass?",
//       answer: "After your current pass expires, you will get a \"Renew Pass\" option under the \"Pay\" button. After clicking on \"Renew\", you will be able to make payment and your new pass will be generated."
//     },
//     {
//       question: "What details do I need to fill in for pass generation?",
//       answer: "You'll need to fill your name, mobile number, email, route, a photo, and ID proof such as Aadhar card and Bonafide certificate given by your college."
//     },
//     {
//       question: "Can I select a validity duration for the pass?",
//       answer: "No, the pass will be generated only for 30 days. Future app updates may enable this feature, but the current version supports only 30-day validity."
//     },
//     {
//       question: "Can I apply for multiple passes?",
//       answer: "No, each user can apply for one active pass at a time to prevent misuse."
//     },
//     {
//       question: "The pass application form isn't submitting.",
//       answer: "Ensure all mandatory fields are filled correctly and your documents are in the correct format. If the issue persists, refresh the app and try again."
//     },
//     {
//       question: "I filled out the wrong details---how do I edit?",
//       answer: "Once submitted, you cannot edit the pass. Cancel it and submit a new one with correct information."
//     },
//     {
//       question: "My pass request is stuck on pending.",
//       answer: "Admin approval typically takes a few minutes to hours. If delayed beyond 24 hours, contact support."
//     },
//     {
//       question: "How do I pay for my bus pass?",
//       answer: "Once approved, you'll be directed to the Razorpay payment gateway where you can pay via UPI, debit/credit card, or net banking."
//     },
//     {
//       question: "What payment options are supported?",
//       answer: "We support UPI, cards, wallets, net banking, and most major Indian payment methods through Razorpay."
//     },
//     {
//       question: "Will I receive a receipt after payment?",
//       answer: "Yes, a digital receipt will be emailed to you and available in the \"Payments\" section of the app."
//     },
//     {
//       question: "My money was deducted but I didn't get a pass.",
//       answer: "Confirmation delays sometimes occur. Check again after a few minutes or contact support with your transaction ID."
//     },
//     {
//       question: "Razorpay failed while processing my transaction.",
//       answer: "Try another payment method or retry after a short while. Razorpay may be temporarily overloaded."
//     },
//     {
//       question: "My payment is stuck in processing for too long.",
//       answer: "Wait 15 minutes and check your pass status. If unresolved, contact support with your payment ID."
//     },
//     {
//       question: "What is the QR code used for?",
//       answer: "The QR code is your digital bus pass. Bus conductors will scan it for verification during travel."
//     },
//     {
//       question: "How do I scan QR code for verification?",
//       answer: "Click the \"Scan QR\" button to access the scanning interface."
//     },
//     {
//       question: "I am unable to scan.",
//       answer: "Ensure you haven't exceeded the 2-scan daily limit. Clear the app cache or reinstall the app. If issues persist, use the \"Help\" button for manual verification."
//     },
//     {
//       question: "The conductor says my pass isn't valid.",
//       answer: "Verify your pass hasn't expired or exceeded usage limits. If valid, show the receipt or contact support."
//     },
//     {
//       question: "The Scan QR option says 'Already Used' even though I didn't travel.",
//       answer: "This might be a technical glitch. Contact support with a screenshot and time of the incident."
//     },
//     {
//       question: "How long is the pass valid?",
//       answer: "Currently 30 days. Future updates will introduce more validity duration options."
//     },
//     {
//       question: "Can I renew my pass before expiry?",
//       answer: "No, renewal is only possible after the existing pass expires."
//     },
//     {
//       question: "Will I be notified before my pass expires?",
//       answer: "Yes, you'll receive notifications 1-2 days before expiry."
//     },
//     {
//       question: "My pass expired without any alert.",
//       answer: "Ensure app notifications are enabled. You can also check expiry dates in the \"Dashboard\" section."
//     },
//     {
//       question: "I'm unable to renew my pass.",
//       answer: "The option appears only after expiry. Wait until the last day or contact support."
//     },
//     {
//       question: "I renewed my pass but the date isn't updating.",
//       answer: "Refresh the app or clear the cache. If unresolved, contact support with your transaction ID."
//     },
//     {
//       question: "Where can I check my active passes?",
//       answer: "Your active passes are visible in the \"Dashboard\" section."
//     },
//     {
//       question: "How do I contact customer support from the app?",
//       answer: "Go to the \"Help & Support\" tab to chat, email, or call directly."
//     },
//     {
//       question: "Can I use PassEase on both web and mobile?",
//       answer: "Yes, PassEase is available on Android/iOS apps and a web portal."
//     },
//     {
//       question: "The app is slow and unresponsive.",
//       answer: "Restart the app, close background apps, or check your internet connection."
//     },
//     {
//       question: "My dashboard is not loading.",
//       answer: "This is likely a connectivity issue. Switch to Wi-Fi or re-login."
//     },
//     {
//       question: "Notifications aren't working.",
//       answer: "Enable notifications in both phone settings and the app (Settings > Notifications)."
//     },
//     {
//       question: "Is my payment information safe?",
//       answer: "Yes, transactions are secured by Razorpay with end-to-end encryption and PCI-DSS compliance."
//     },
//     {
//       question: "Who can see my travel history?",
//       answer: "Only you and authorized admin staff. It is not publicly visible."
//     },
//     {
//       question: "What data does PassEase collect?",
//       answer: "We collect minimal necessary data: name, contact details, ID proof, and travel information."
//     },
//     {
//       question: "How can I raise a complaint?",
//       answer: "Go to \"Help & Support\" > \"Feedback\" and submit your complaint."
//     },
//     {
//       question: "Where do I submit feedback?",
//       answer: "Use the \"Feedback\" section in the app."
//     },
//     {
//       question: "How quickly does support respond?",
//       answer: "Average response time is under 24 hours. Critical issues are prioritized."
//     },
//     {
//       question: "My issue was not resolved even after 3 days.",
//       answer: "Reply to the same ticket ID for escalation. We apologize for the inconvenience."
//     },
//     {
//       question: "Support isn't replying to my messages.",
//       answer: "Check your internet connection and message status. If needed, email us directly."
//     },
//     {
//       question: "There's no option to talk to a human agent.",
//       answer: "Type \"help\" in the Help & Support chat to get phone numbers and email IDs of authorities."
//     },
//     {
//       question: "What support channels are available?",
//       answer: "In-app chat, email, and phone support."
//     },
//   ];

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
      keywords: ['registration', 'how', 'register'],
      answer: 'You can register by clicking on "Register", then entering your name, email, password and uploading required documents. After verification, you’ll be successfully registered.'
    },
    {
      keywords: ['sign up', 'email', 'phone', 'number'],
      answer: 'Yes, both Mobile number and Email are required for backup and notifications.'
    },
    {
      keywords: ['register', 'someone', 'else'],
      answer: 'No, each user must register using their own mobile number to ensure authentication and avoid misuse.'
    },
    {
      keywords: ['email', 'already', 'registered'],
      answer: 'Try logging in with the existing email or use a new email. If the issue persists, contact support.'
    },
    {
      keywords: ['registration', 'crash', 'crashing'],
      answer: 'Try clearing your app cache or reinstalling the app. If it continues, report the issue via Help & Support.'
    },
    {
      keywords: ['form', 'not', 'submitting'],
      answer: 'Ensure all mandatory fields are filled correctly and your documents are in the correct format. If the issue persists, refresh the app and try again.'
    },
    {
      keywords: ['pass', 'request', 'pending'],
      answer: 'Admin approval typically takes a few minutes to hours. If delayed beyond 24 hours, contact support.'
    },
    {
      keywords: ['how', 'pay', 'bus pass'],
      answer: 'Once approved, you\'ll be directed to the Razorpay payment gateway where you can pay via UPI, debit/credit card, or net banking.'
    },
    {
      keywords: ['payment', 'options', 'supported'],
      answer: 'We support UPI, cards, wallets, net banking, and most major Indian payment methods through Razorpay.'
    },
    {
      keywords: ['receipt', 'payment', 'receive'],
      answer: 'Yes, a digital receipt will be emailed to you and available in the "Payments" section of the app.'
    },
    {
      keywords: ['money', 'deducted', 'no pass'],
      answer: 'Confirmation delays sometimes occur. Check again after a few minutes or contact support with your transaction ID.'
    },
    {
      keywords: ['razorpay', 'failed', 'transaction'],
      answer: 'Try another payment method or retry after a short while. Razorpay may be temporarily overloaded.'
    },
    {
      keywords: ['payment', 'processing', 'stuck'],
      answer: 'Wait 15 minutes and check your pass status. If unresolved, contact support with your payment ID.'
    },
    {
      keywords: ['qr code', 'used', 'for'],
      answer: 'The QR code is your digital bus pass. Bus conductors will scan it for verification during travel.'
    },

    {
        keywords: ['unable', 'scan'],
        answer: 'Ensure you haven’t exceeded the 2-scan daily limit. Clear the app cache or reinstall the app. If issues persist, use the "Help" button for manual verification.'
    },
    {
      keywords: ['scan', 'qr', 'verification'],
      answer: 'Click the "Scan QR" button to access the scanning interface.'
    },
    {
      keywords: ['conductor', 'pass', 'invalid'],
      answer: 'Verify your pass hasn’t expired or exceeded usage limits. If valid, show the receipt or contact support.'
    },
    {
      keywords: ['qr', 'already used', 'not travelled'],
      answer: 'This might be a technical glitch. Contact support with a screenshot and time of the incident.'
    },
    {
      keywords: ['pass', 'validity', 'how long'],
      answer: 'Currently 30 days. Future updates will introduce more validity duration options.'
    },
    {
      keywords: ['renew', 'pass', 'before expiry'],
      answer: 'No, renewal is only possible after the existing pass expires.'
    },
    {
      keywords: ['pass', 'expiry', 'notification'],
      answer: 'Yes, you’ll receive notifications 1-2 days before expiry.'
    },
    {
      keywords: ['pass', 'expired', 'no alert'],
      answer: 'Ensure app notifications are enabled. You can also check expiry dates in the "Dashboard" section.'
    },
    {
      keywords: ['unable', 'renew', 'pass'],
      answer: 'The option appears only after expiry. Wait until the last day or contact support.'
    },
    {
      keywords: ['renewed', 'pass', 'date', 'not updating'],
      answer: 'Refresh the app or clear the cache. If unresolved, contact support with your transaction ID.'
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
      keywords: ['support', 'no reply'],
      answer: 'Check your internet connection and message status. If needed, email us directly.'
    },
    {
      keywords: ['no option', 'talk', 'human agent'],
      answer: 'Type "help" in the Help & Support chat to get phone numbers and email IDs of authorities.'
    },
    {
      keywords: ['support', 'channels', 'available'],
      answer: 'In-app chat, email, and phone support.'
    }
];
  
export default faqData;

  