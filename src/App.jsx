import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadContent, isUsingFallback } from './content/contentLoader';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Approach from './pages/Approach';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await loadContent();
        setContent(data);
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">Error loading content</p>
          <p className="text-neutral-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const { site_meta } = content || {};

  return (
    <Router basename="/flowersflowerseverywhere">
      <div className="min-h-screen flex flex-col">
        {/* Fallback Mode Banner */}
        {isUsingFallback() && (
          <div className="bg-amber-100 border-b border-amber-300 py-2">
            <div className="container-custom">
              <p className="text-sm text-amber-800 text-center">
                <span className="font-semibold">Demo Mode:</span> Content is being loaded from local fallback. 
                Configure Google Sheets URL to enable dynamic updates.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <Header
          siteTitle={site_meta?.siteTitle}
          phone={site_meta?.phone}
          email={site_meta?.email}
        />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home content={content} />} />
            <Route path="/about" element={<About content={content} />} />
            <Route path="/approach" element={<Approach content={content} />} />
            <Route path="/services" element={<Services content={content} />} />
            <Route path="/contact" element={<Contact content={content} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer
          siteTitle={site_meta?.siteTitle}
          phone={site_meta?.phone}
          email={site_meta?.email}
          address={site_meta?.address}
        />
      </div>
    </Router>
  );
}

export default App;
