export default function TermsPrivacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="container mx-auto px-6 max-w-4xl bg-white p-12 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-12 text-center tracking-wide drop-shadow-lg">Terms & Privacy</h1>
        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-300 pb-2">Terms of Service</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Welcome to ElectroShop. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg">
            <li>Use of the site is at your own risk.</li>
            <li>We reserve the right to modify or terminate the service for any reason without notice.</li>
            <li>All content is provided "as is" without warranties of any kind.</li>
            <li>Unauthorized use of the site may give rise to a claim for damages.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-300 pb-2">Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-3 text-lg">
            <li>We collect information you provide directly to us.</li>
            <li>We use cookies to enhance your experience.</li>
            <li>Your data is stored securely and not shared with third parties without consent.</li>
            <li>You can request to access or delete your personal information.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
