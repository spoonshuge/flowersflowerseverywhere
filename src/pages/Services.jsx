import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';

const Services = ({ content }) => {
  const { services } = content;

  return (
    <div>
      {/* Hero Section */}
      <Hero
        headline="Services"
        subheadline="Tailored therapeutic approaches to meet your unique needs"
        compact={true}
      />

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services && services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-neutral-600">Services information will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-md">
              <h2 className="text-3xl font-serif text-primary-800 mb-6">
                Payment & Insurance
              </h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <span className="font-semibold">Payment Methods:</span> Credit/Debit Card (via Simple Practice), 
                  Cash, Check, Venmo, and PayPal
                </p>
                <p>
                  <span className="font-semibold">Insurance:</span> I am a private-pay practice and do not currently 
                  accept insurance. However, I can provide a "super bill" for potential out-of-network reimbursement 
                  through your insurance company.
                </p>
                <div className="pt-6 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600 italic">
                    Not sure which service is right for you? Schedule a free 15-minute consultation to discuss 
                    your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
