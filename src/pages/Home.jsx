import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

function Home() {
  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 text-white">
                AI-Powered Precision Medicine
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Experience the future of healthcare with our advanced AI technology, 
                delivering personalized medical insights and treatment recommendations.
              </p>
              <div className="flex gap-4">
                <Link to="/patient-login" 
                  className="btn bg-white text-primary-700 hover:bg-primary-50">
                  Start Your Health Journey
                </Link>
                <Link to="/doctor-login" 
                  className="btn bg-primary-700 text-white hover:bg-primary-800">
                  Medical Professionals
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg"
                alt="Medical Technology"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-6">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-4">Submit Health Data</h3>
              <p className="text-gray-600">
                Securely share your symptoms and health information for AI analysis.
              </p>
            </div>
            <div className="card text-center p-6">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI processes your data to generate personalized insights.
              </p>
            </div>
            <div className="card text-center p-6">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-4">Expert Review</h3>
              <p className="text-gray-600">
                Qualified doctors review and validate AI recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/7089629/pexels-photo-7089629.jpeg"
                alt="Medical Professional"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-primary-600 text-2xl">✓</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cutting-edge AI Technology</h3>
                    <p className="text-gray-600">Advanced algorithms trained on vast medical datasets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-primary-600 text-2xl">✓</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Medical Review</h3>
                    <p className="text-gray-600">All AI insights are validated by qualified healthcare professionals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-primary-600 text-2xl">✓</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
                    <p className="text-gray-600">Tailored recommendations based on your unique health profile.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Healthcare?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers already benefiting from 
            AI-powered precision medicine.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/patient-login" 
              className="btn bg-white text-primary-700 hover:bg-primary-50">
              Get Started Now
            </Link>
            <Link to="/about" 
              className="btn bg-primary-600 text-white hover:bg-primary-800">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default Home;