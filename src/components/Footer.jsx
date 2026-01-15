import { Link } from 'react-router-dom';

const Footer = ({ siteTitle, phone, email, address }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-serif text-lg mb-4">{siteTitle}</h3>
            <p className="text-sm text-neutral-400">
              Experiential therapy for healing and growth. Supporting individuals, couples, and families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/about" className="hover:text-primary-400 transition-colors">About</Link>
              <Link to="/approach" className="hover:text-primary-400 transition-colors">Approach</Link>
              <Link to="/services" className="hover:text-primary-400 transition-colors">Services</Link>
              <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex flex-col space-y-2 text-sm">
              {phone && (
                <a href={`tel:${phone}`} className="hover:text-primary-400 transition-colors">
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="hover:text-primary-400 transition-colors">
                  {email}
                </a>
              )}
              {address && (
                <address className="not-italic text-neutral-400 mt-2">
                  {address}
                </address>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; {currentYear} {siteTitle}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
