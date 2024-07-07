export default function PrivacyPolicyPage() {
  return(
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy for CryptoExchangeP2P.com</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to CryptoExchangeP2P.com. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and disclose your information when you use our peer-to-peer (P2P) Bitcoin exchange platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>When you register on our platform, we collect the following information:</p>
        <ul className="list-disc list-inside">
          <li>Username</li>
          <li>Last Name</li>
          <li>Email</li>
          <li>Password</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Use of Your Email</h2>
        <p>We use your email address for the following purposes:</p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Account Registration:</strong> When you register on our web platform, you will receive an account activation notification. This email is sent using Django for the backend.
          </li>
          <li>
            <strong>Account Activation:</strong> After you activate your account through the activation link, you will be notified that your account has been successfully activated.
          </li>
          <li>
            <strong>Post Approval Notification:</strong> When you create a publication to sell digital assets, you will receive an email notifying you that your post has been approved by our team.
          </li>
          <li>
            <strong>Offer Notification:</strong> When another user makes a purchase offer on your post, you will be notified that your offer has been taken. This notification is important as it allows you to review the payment receipt that the buyer has attached, which is stored in our database.
          </li>
          <li>
            <strong>Purchase Confirmation:</strong> When your purchase offer is accepted, you will be notified that your digital assets are now reflected in your account.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Email Sending Processes and Procedures</h2>
        <p>
          We use Amazon SES service to send emails occasionally for the following purposes:
        </p>
        <ul className="list-disc list-inside">
          <li>To notify users when they create posts to sell digital assets.</li>
          <li>To notify users when they make or receive purchase offers.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Email Frequency</h2>
        <p>
          We only send emails for transactional purposes related to the purchase or sale of digital assets. We do not use your email for marketing, uncontrolled spam, or other purposes. You will not receive emails from us unless it is related to a purchase or sale on the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Security of Your Information</h2>
        <p>
          We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it against unauthorized access, loss, or misuse.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website and updating the date of the last revision.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact the founder via WhatsApp at +52 442-896-8441.
        </p>
      </section>

      <p className="text-sm text-gray-500">By using our platform, you confirm that you have read, understood, and accepted this Privacy Policy.</p>
      <p className="text-sm text-gray-500 mt-4">Last Updated: June 22, 2024</p>
    </div>
  )
}