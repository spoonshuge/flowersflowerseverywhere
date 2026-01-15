import DynamicImage from './DynamicImage';

const ServiceCard = ({ 
  title, 
  emoji, 
  description, 
  details, 
  rate, 
  rates,
  frequency, 
  availability,
  note,
  images 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      {images && images.length > 0 && (
        <div className="h-48 md:h-64 overflow-hidden">
          <DynamicImage
            src={images[0].path}
            alt={images[0].alt}
            showCaption={false}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          {emoji && <span className="text-3xl">{emoji}</span>}
          <h3 className="text-2xl font-serif font-bold text-primary-800">{title}</h3>
        </div>

        <p className="text-neutral-600 mb-6 leading-relaxed">{description}</p>

        {/* Details */}
        {details && details.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-neutral-800 mb-3">Details:</h4>
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-600">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Frequency */}
        {frequency && (
          <p className="text-sm text-neutral-600 mb-4">
            <span className="font-semibold">Frequency:</span> {frequency}
          </p>
        )}

        {/* Availability */}
        {availability && (
          <p className="text-sm text-neutral-600 mb-4">
            <span className="font-semibold">Availability:</span> {availability}
          </p>
        )}

        {/* Rate */}
        {rate && (
          <div className="bg-primary-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-primary-800">{rate}</p>
          </div>
        )}

        {/* Multiple Rates */}
        {rates && rates.length > 0 && (
          <div className="bg-primary-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-primary-800 mb-2">Rates:</h4>
            <ul className="space-y-1">
              {rates.map((rateItem, index) => (
                <li key={index} className="text-sm text-primary-700">{rateItem}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Note */}
        {note && (
          <p className="text-sm text-neutral-500 italic">{note}</p>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
