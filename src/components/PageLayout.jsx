import Header from './Header';
import Footer from './Footer';

function PageLayout({ children }) {
  return (
    <>
      <Header />
      <main className="page">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PageLayout;