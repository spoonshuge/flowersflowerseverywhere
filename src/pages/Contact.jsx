import Hero from '../components/Hero';
import FAQItem from '../components/FAQItem';
import DynamicImage from '../components/DynamicImage';

const Contact = ({ content }) => {
  const { contact, faqs } = content;

  return (
    <div>
      {/* Hero Section */}
      <Hero
        headline={contact?.title || 'Get Started'}
        subheadline={contact?.subtitle || 'Schedule Your Free 15-Minute Consultation'}
        compact={true}
      />

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-serif text-primary-800 mb-6">
                Contact Information
              </h2>
              
              {contact?.description && (
                <p className="text-neutral-700 leading-relaxed mb-8">
                  {contact.description}
                </p>
              )}

              <div className="space-y-6">
                {/* Phone */}
                {contact?.phone && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">Phone</h3>
                      <a href={`tel:${contact.phone}`} className="text-primary-600 hover:text-primary-700">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {contact?.email && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">Email</h3>
                      <a href={`mailto:${contact.email}`} className="text-primary-600 hover:text-primary-700">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Address */}
                {contact?.address && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-1">Office Location</h3>
                      <address className="not-italic text-neutral-600">
                        {contact.address}
                      </address>
                    </div>
                  </div>
                )}
              </div>

              {/* Accessibility Note */}
              {contact?.accessibilityNote && (
                <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <p className="text-sm text-neutral-700">
                    <span className="font-semibold">Accessibility Note:</span> {contact.accessibilityNote}
                  </p>
                </div>
              )}
            </div>

            {/* Image */}
            {contact?.image && (
              <div className="h-96 lg:h-full">
                <DynamicImage
                  src={contact.image}
                  alt={contact.imageAlt || 'Office location'}
                  className="rounded-xl shadow-lg"
                  showCaption={false}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif text-primary-800 text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="bg-white rounded-xl shadow-md p-8">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: '#2a7650' }}>
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif mb-6 font-bold" style={{ color: '#ffffff' }}>
            Ready to Take the First Step?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto font-medium" style={{ color: '#ffffff' }}>
            Reach out today to schedule your free consultation.
          </p>
          {contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="bg-white text-primary-800 hover:bg-primary-50 hover:text-primary-900 font-semibold px-8 py-4 rounded-lg inline-block transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Call {contact.phone}
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
