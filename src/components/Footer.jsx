function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-semibold mb-4">MediPredict AI</h5>
            <p className="text-gray-400">
              Revolutionizing healthcare with artificial intelligence for precision medicine.
            </p>
          </div>
          
          <div>
            <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/patient-login" className="text-gray-400 hover:text-white transition-colors">Patient Portal</a></li>
              <li><a href="/doctor-login" className="text-gray-400 hover:text-white transition-colors">Doctor Portal</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-xl font-semibold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About AI Technology</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-xl font-semibold mb-4">Contact</h5>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@medipredictai.com</li>
              <li className="text-gray-400">Phone: (555) 123-4567</li>
              <li className="text-gray-400">Hours: Mon-Fri 9am-5pm EST</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {currentYear} MediPredict AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;