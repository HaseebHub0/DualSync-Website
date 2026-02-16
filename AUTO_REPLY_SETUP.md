# Setting Up the Auto-Reply

To enable the automatic response for your clients, follow these steps:

## 1. Create the Template
1. Go to **EmailJS Dashboard** -> **Email Templates**.
2. Click **Create New Template**.
3. **Name it:** "Auto Reply DualSync".
4. **Subject:** `Submission Received - DualSync Agency`
5. **Content:** Click the **Source Code (< >)** button and paste the code from `AUTO_REPLY_TEMPLATE.html`.
6. **IMPORTANT:**
   - Click **Settings** (top right).
   - In the **"To Email"** field, enter: `{{email}}`  <-- *This is critical! It tells EmailJS to send to the USER's email.*
   - In the **"From Name"**, enter: `DualSync Agency`.
   - In the **"From Email"**, enter your Zoho email.
7. Click **Save**.
8. **Copy the Template ID** (e.g., `template_xyz789`).

## 2. Add ID to Code
1. Open your `.env.local` file.
2. Add this new line:
   ```env
   VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_new_template_id_here
   ```

## 3. Restart
1. Restart your terminal (`npm run dev`) for the new key to load.
