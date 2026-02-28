import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Three different tile styles for comparison
const tileStyles = [
  {
    name: 'Style A – Dark Minimal',
    url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    subdomains: 'abcd',
  },
  {
    name: 'Style B – Grayscale',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    subdomains: 'abcd',
  },
  {
    name: 'Style C – Toner Lite',
    url: 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png',
    subdomains: '',
  },
];

const locations = [
  {
    city: 'Mannheim',
    airport: 'EDFM',
    address: 'City Airport Mannheim',
    coords: [49.4727, 8.5143] as [number, number],
    coordsLabel: "N 49° 28,36′ · E 08° 30,86′",
    tileStyle: tileStyles[0],
  },
  {
    city: 'Stuttgart',
    airport: 'EDDS',
    address: 'General Aviation Terminal, 70629 Stuttgart',
    coords: [48.6898, 9.3220] as [number, number],
    coordsLabel: "N 48° 41,39′ · E 09° 19,32′",
    tileStyle: tileStyles[1],
  },
  {
    city: 'Augsburg',
    airport: 'EDMA',
    address: 'Flughafen Augsburg',
    coords: [48.4254, 10.9317] as [number, number],
    coordsLabel: "N 48° 25,52′ · E 10° 55,90′",
    tileStyle: tileStyles[2],
  },
];

const LocationMap = ({ coords, city, tileStyle }: { coords: [number, number]; city: string; tileStyle: typeof tileStyles[0] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: coords,
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    const tileOptions: L.TileLayerOptions = { maxZoom: 19 };
    if (tileStyle.subdomains) {
      tileOptions.subdomains = tileStyle.subdomains;
    }
    L.tileLayer(tileStyle.url, tileOptions).addTo(map);

    const markerIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
        width: 14px; height: 14px;
        background: hsl(24, 93%, 48%);
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.8);
        box-shadow: 0 0 12px hsl(24, 93%, 48%, 0.6), 0 0 24px hsl(24, 93%, 48%, 0.3);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    L.marker(coords, { icon: markerIcon }).addTo(map);
    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [coords, city]);

  return <div ref={mapRef} className="w-full h-full" />;
};

const LocationsSection = () => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      {/* HUD Grid */}
      <div className="absolute inset-0 hud-grid opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="tech-label text-primary mb-4 block">APPROACH PHASE / STANDORTE</span>
          <h2 className="headline-hero text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Unsere <span className="text-gradient-primary">Basen</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategisch positioniert im Herzen Europas. 
            Bereit für jede Mission.
          </p>
        </motion.div>

        {/* Flight Route Visualization */}
        <motion.div 
          className="relative mb-16 hidden md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <svg className="w-full h-24" viewBox="0 0 1200 100" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M100,50 Q400,20 600,50 T1100,50"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3 }}
            />
            {[100, 600, 1100].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="50" r="8" fill="hsl(var(--primary))" />
                <circle cx={x} cy="50" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                <circle cx={x} cy="50" r="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group glass-panel rounded-sm p-6 md:p-8 hover:border-primary/50 transition-all duration-300"
            >
              {/* Real Map */}
              <div className="w-full h-40 mb-2 rounded-sm overflow-hidden border border-border/30 relative">
                <LocationMap coords={location.coords} city={location.city} tileStyle={location.tileStyle} />
                <div className="absolute top-2 left-2 z-[1000] bg-background/80 backdrop-blur-sm px-2 py-1 rounded-sm">
                  <span className="tech-label text-primary text-[8px]">{location.tileStyle.name}</span>
                </div>
              </div>

              {/* Airport Code */}
              <div className="flex items-center justify-between mb-2">
                <span className="tech-label text-primary text-lg">{location.airport}</span>
                <MapPin className="w-5 h-5 text-primary" />
              </div>

              {/* Coordinates */}
              <p className="tech-label text-muted-foreground text-[9px] mb-4">{location.coordsLabel}</p>

              {/* City Name */}
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 tracking-wide">
                {location.city}
              </h3>

              {/* Address */}
              <p className="text-muted-foreground text-sm mb-6">
                {location.address}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-border mb-6" />

              {/* Contact */}
              <div className="space-y-2 text-sm">
                <a href="tel:+4962179944698" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0621 - 79 94 46 98</span>
                </a>
                <a href="mailto:info@heliseven.de" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@heliseven.de</span>
                </a>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
