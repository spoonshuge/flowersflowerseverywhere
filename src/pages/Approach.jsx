import Hero from '../components/Hero';
import DynamicImage from '../components/DynamicImage';

const Approach = ({ content }) => {
  const { approach } = content;

  return (
    <div>
      {/* Hero Section */}
      <Hero
        headline={approach?.title || 'My Approach'}
        subheadline={approach?.subtitle}
        compact={true}
      />

      {/* Description */}
      {approach?.description && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-neutral-700 leading-relaxed">
                {approach.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Modalities */}
      {approach?.modalities && approach.modalities.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-800 text-center mb-12">
              Experiential Modalities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approach.modalities.map((modality, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-xl font-serif font-bold text-primary-800 mb-3">
                    {modality.name}
                  </h3>
                  <p className="text-neutral-600">
                    {modality.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Images */}
      {approach?.images && approach.images.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {approach.images.map((image, index) => (
                <div key={index} className="relative h-80">
                  <DynamicImage
                    src={image.path}
                    alt={image.alt}
                    caption={image.caption}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Philosophy Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              A Different Kind of Therapy
            </h2>
            <p className="text-xl text-primary-100 leading-relaxed">
              Rather than traditional talk therapy, I integrate mindfulness and experiential 
              approaches to help you explore, process, and heal in ways that engage both mind and body.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Approach;
