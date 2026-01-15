import { Link } from 'react-router-dom';
import DynamicImage from './DynamicImage';

const Hero = ({ headline, subheadline, ctaText, ctaLink = '/contact', image, imageAlt, compact = false }) => {
  return (
    <section className={`relative bg-neutral-100 ${compact ? 'py-12' : 'py-20 md:py-28'}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className={`font-serif text-primary-800 ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'} leading-tight`}>
              {headline}
            </h1>
            {subheadline && (
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                {subheadline}
              </p>
            )}
            {ctaText && (
              <div className="pt-4">
                <Link to={ctaLink} className="btn-primary inline-block">
                  {ctaText}
                </Link>
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="relative h-64 md:h-96 lg:h-[500px]">
              <DynamicImage
                src={image}
                alt={imageAlt}
                className="rounded-2xl shadow-2xl"
                showCaption={false}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
