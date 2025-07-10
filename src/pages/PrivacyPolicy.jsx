import PageLayout from '../components/PageLayout';

function PrivacyPolicy() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Collection and Usage</h2>
            <p className="text-gray-700">
              We collect and process your health data to provide personalized medical insights and recommendations. 
              This includes symptoms, vital signs, medical history, and lifestyle information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
            <p className="text-gray-700">
              Your health data is encrypted and stored securely. We implement industry-standard security measures 
              to protect your personal information from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">AI Processing</h2>
            <p className="text-gray-700">
              Our AI algorithms process your health data to generate insights and recommendations. This processing 
              is automated but always reviewed by qualified healthcare professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
            <p className="text-gray-700">
              We only share your health data with healthcare providers directly involved in your care. 
              We never sell or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, correct, or delete your personal data. Contact our support team 
              to exercise these rights or ask questions about our privacy practices.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

export default PrivacyPolicy;