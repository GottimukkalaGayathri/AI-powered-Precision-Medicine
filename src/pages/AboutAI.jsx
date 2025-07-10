import PageLayout from '../components/PageLayout';

function AboutAI() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Our AI Technology</h1>
        
        <div className="prose max-w-none space-y-8">
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">How Our AI Works</h2>
            <p className="text-gray-700 mb-4">
              Our AI system uses advanced machine learning algorithms trained on vast medical datasets to analyze 
              patient health data and generate personalized insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold mb-2">Data Analysis</h3>
                <p className="text-sm text-gray-600">
                  Processes patient symptoms, vitals, and medical history
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="font-semibold mb-2">Pattern Recognition</h3>
                <p className="text-sm text-gray-600">
                  Identifies potential health conditions and risk factors
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Generates personalized treatment suggestions
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">AI + Human Expertise</h2>
            <p className="text-gray-700">
              While our AI provides powerful insights, all recommendations are reviewed by qualified healthcare 
              professionals to ensure accuracy and safety. This combination of artificial intelligence and human 
              expertise delivers the best possible care recommendations.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-gray-700">
              We prioritize the security and privacy of your health data. Our AI systems use state-of-the-art 
              encryption and security measures to protect your sensitive information.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Continuous Learning</h2>
            <p className="text-gray-700">
              Our AI system continuously learns and improves from new medical research and validated patient 
              outcomes, ensuring you receive the most up-to-date and accurate health recommendations.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

export default AboutAI;