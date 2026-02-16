# How to Fix "535 Authentication Failed" (Zoho Mail)

This error happens because your Zoho account has **Two-Factor Authentication (2FA)** enabled. You cannot use your regular password for EmailJS. You must create a specific "App Password".

## Step 1: Generate App Password in Zoho
1. log in to your [Zoho Account](https://accounts.zoho.com/).
2. From the left menu, click **Security**.
3. Scroll down to the **App Passwords** section.
4. Click **Generate New Password**.
5. **App Name:** Enter "EmailJS" (or any name you like).
6. Click **Generate**.
7. **COPY** the password shown (it will look like `xxxx-xxxx-xxxx-xxxx`). **Do not lose this**; you won't see it again.

## Step 2: Use in EmailJS
1. Go back to the **EmailJS Dashboard** -> **Email Services**.
2. Click on your **Zoho** service (or add it again if it failed).
3. **Email:** Enter `info@dualsyncagency.com`.
4. **Password:** PASTE the **App Password** you just copied (NOT your login password).
5. Click **Add Service** / **Save**.

It should connect instantly now! ✅
