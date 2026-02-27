import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 via-background to-background" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 hud-grid opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="tech-label text-primary mb-4 block">LANDING PHASE / KONTAKT</span>
          <h2 className="headline-hero text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Bereit für den <span className="text-gradient-primary">Abflug?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kontaktieren Sie uns für Ihr persönliches Flugerlebnis 
            oder eine unverbindliche Beratung.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-panel rounded-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 tracking-wide">
                Direkter Kontakt
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="tel:+4962179944698" 
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="tech-label mb-1">Telefon</p>
                    <p className="text-foreground">0621 - 79 94 46 98</p>
                  </div>
                </a>

                <a 
                  href="mailto:info@heliseven.de" 
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="tech-label mb-1">E-Mail</p>
                    <p className="text-foreground">info@heliseven.de</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-muted-foreground group">
                  <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="tech-label mb-1">Hauptsitz</p>
                    <p className="text-foreground">München, Deutschland</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="glass-panel rounded-sm p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 tracking-wide">
                Flugzeiten
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Montag - Freitag</span>
                  <span className="text-foreground">08:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samstag</span>
                  <span className="text-foreground">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sonntag</span>
                  <span className="text-foreground">Nach Vereinbarung</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-panel rounded-sm p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6 tracking-wide">
                Anfrage senden
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="tech-label block mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label className="tech-label block mb-2">E-Mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="ihre@email.de"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="tech-label block mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="+49 123 456 789"
                  />
                </div>
                <div>
                  <label className="tech-label block mb-2">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="tour">Rundflug</option>
                    <option value="training">Ausbildung</option>
                    <option value="vip">VIP Transfer</option>
                    <option value="event">Event</option>
                    <option value="industry">Industrie</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="tech-label block mb-2">Nachricht</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Erzählen Sie uns von Ihrem Vorhaben..."
                />
              </div>

              <Button variant="hero" size="lg" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Anfrage absenden
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
