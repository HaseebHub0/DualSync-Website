# EmailJS Setup Guide for DualSync Agency

Since we are migrating to EmailJS to ensure reliable delivery to your Zoho Mail, please follow these steps to generate your 3 API keys.

## 1. Create an Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and Sign Up (Free Plan is sufficient).

## 2. Connect Your Email Service
1. In the EmailJS dashboard, go to the **Email Services** tab.
2. Click **Add New Service**.
3. Select **Zoho Mail** (or whichever provider handles `info@dualsyncagency.com`).
4. Connect the account.
5. **IMPORTANT:** Copy the `Service ID` (e.g., `service_xyz123`). Save this for later.

## 3. Create an Email Template
1. Go to the **Email Templates** tab.
2. Click **Create New Template**.
3. **Subject Line:** `New Project Inquiry from {{name}}`
4. **Content:** Design the email that *YOU* want to receive. Use these variables which my code sends:
   - `{{name}}` - Client Name
   - `{{email}}` - Client Email
   - `{{project_type}}` - Service Requested
   - `{{message}}` - The message body
   
   *Example Body:*
   ```text
   Name: {{name}}
   Email: {{email}}
   Project: {{project_type}}
   
   Message:
   {{message}}
   ```
5. **IMPORTANT:** Click **Settings** (top right of template editor), name it "Contact Form", and copy the `Template ID` (e.g., `template_abc456`). Save this.

## 4. Get Your Public Key
1. Go to the **Account** tab (click your avatar -> Account).
2. Look for **Public Key** (it starts with standard letters/numbers). Copy this.

## 5. Add Keys to Your Project
Open the `.env.local` file in your project folder and add these lines:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**After adding these, restart your terminal (`npm run dev`) and test the form!**
