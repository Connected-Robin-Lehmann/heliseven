import { motion } from 'framer-motion';
import HeliSevenLogo from '@/assets/logos/HeliSevenGroup_logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <img src={HeliSevenLogo} alt="HeliSeven Group" className="h-10 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Die Welt von oben erleben. 
              Ausbildung, Erlebnis, Mission, Business.
            </p>
          </div>

          {/* Marken */}
          <div>
            <h4 className="tech-label text-foreground mb-4">Marken</h4>
            <ul className="space-y-2 text-sm">
              {['HeliSeven', 'HeliTours', 'HeliSxool', 'HeliWorks', 'HeliEvents'].map((brand) =>
              <li key={brand}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {brand}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="tech-label text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Rundflüge', 'Pilotenausbildung', 'VIP Transfer', 'Industrie', 'Events'].map((service) =>
              <li key={service}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="tech-label text-foreground mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              {['Impressum', 'Datenschutz', 'AGB', 'Cookies'].map((item) =>
              <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} HeliSeven Group. Alle Rechte vorbehalten.
          </p>

          {/* Social Links or Certifications could go here */}
          <div className="flex items-center gap-4">
            <span className="tech-label text-muted-foreground">FBA Approved </span>
            <span className="w-px h-4 bg-border" />
            <span className="tech-label text-muted-foreground">​</span>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;