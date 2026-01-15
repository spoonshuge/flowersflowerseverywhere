import Hero from '../components/Hero';
import DynamicImage from '../components/DynamicImage';

const About = ({ content }) => {
  const { about } = content;

  return (
    <div>
      {/* Hero Section */}
      <Hero
        headline={about?.title || 'About Me'}
        subheadline={about?.subtitle}
        compact={true}
      />

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image */}
            {about?.image && (
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <DynamicImage
                    src={about.image}
                    alt={about.imageAlt || 'Therapist'}
                    className="rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className={`${about?.image ? 'lg:col-span-2' : 'lg:col-span-3 max-w-4xl mx-auto'} space-y-8`}>
              {/* Intro */}
              {about?.intro && (
                <div>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    {about.intro}
                  </p>
                </div>
              )}

              {/* Promises */}
              {about?.promises && about.promises.length > 0 && (
                <div className="space-y-6">
                  {about.promises.map((promise, index) => (
                    <div key={index} className="bg-primary-50 rounded-lg p-6">
                      <h3 className="text-xl font-serif font-bold text-primary-800 mb-3">
                        {promise.title}
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {promise.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Journey */}
              {about?.journey && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
                    My Journey
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {about.journey}
                  </p>
                </div>
              )}

              {/* Credentials */}
              {about?.credentials && about.credentials.length > 0 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">
                    Credentials
                  </h3>
                  <ul className="space-y-3">
                    {about.credentials.map((credential, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-700">{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas of Focus */}
              {about?.areasOfFocus && about.areasOfFocus.length > 0 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                    Areas of Focus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {about.areasOfFocus.map((area, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                        <span className="text-neutral-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
