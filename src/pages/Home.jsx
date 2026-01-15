import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = ({ content }) => {
  const { home } = content;

  return (
    <div>
      {/* Hero Section */}
      <Hero
        headline={home?.hero?.headline || 'Find Balance. Discover Healing. Move Forward.'}
        subheadline={home?.hero?.subheadline}
        ctaText={home?.hero?.ctaText}
        image={home?.hero?.image}
        imageAlt={home?.hero?.imageAlt}
      />

      {/* Intro Section */}
      {home?.intro && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif text-primary-800 mb-6">
                {home.intro.title}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {home.intro.content}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Offerings Section */}
      {home?.offerings && home.offerings.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-800 text-center mb-12">
              How I Can Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {home.offerings.map((offering, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-serif font-bold text-primary-800 mb-3">
                    {offering.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {offering.description}
                  </p>
                  <Link
                    to="/services"
                    className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16" style={{ backgroundColor: '#2a7650' }}>
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 font-bold" style={{ color: '#ffffff' }}>
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-medium" style={{ color: '#ffffff' }}>
            Schedule a free 15-minute consultation to discuss your needs and see if we're a good fit.
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary-800 hover:bg-primary-50 hover:text-primary-900 font-semibold px-8 py-4 rounded-lg inline-block transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
