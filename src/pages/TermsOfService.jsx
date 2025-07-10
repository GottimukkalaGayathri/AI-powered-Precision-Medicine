import PageLayout from '../components/PageLayout';

function TermsOfService() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="text-gray-700">
              MediPredict AI provides AI-powered health analysis and recommendations. Our service is not a 
              substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="text-gray-700">
              Users must provide accurate and complete information. You are responsible for maintaining the 
              confidentiality of your account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
            <p className="text-gray-700">
              Always consult with qualified healthcare professionals for medical advice. Our AI recommendations 
              are meant to supplement, not replace, professional medical judgment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-gray-700">
              We are not liable for any decisions made based on our AI recommendations. Users acknowledge that 
              medical decisions should be made in consultation with healthcare providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Modifications</h2>
            <p className="text-gray-700">
              We reserve the right to modify or discontinue our service at any time. Users will be notified of 
              significant changes to our terms or service.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

export default TermsOfService;