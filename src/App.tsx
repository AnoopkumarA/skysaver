import { useMemo, useState, useEffect, useRef } from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import GlobeDemo from '@/components/globe-demo';

const navLinks = [
  { href: '#highlights', label: 'Highlights' },
  { href: '#map', label: 'Anywhere Anytime' },
  { href: '#ratings', label: 'Client Love' },
  { href: '#contact', label: 'Contact' }
];

const stats = [
  { value: '50+', label: 'Flights Secured' },
  { value: '30%', label: 'Average Savings' },
  { value: '37', label: 'Countries Booked' }
];

const highlights = [
  {
    icon: '✈️',
    title: 'Any Flight, Any Time',
    description:
      'From red-eye weekends to last-minute escapes, we hunt every fare so you never miss an adventure.'
  },
  {
    icon: '💸',
    title: 'Ultra Low-Cost Alerts',
    description:
      'We monitor airline drops, hidden promotions, and flash sales to secure unbeatable deals before they vanish.'
  },
  {
    icon: '🌍',
    title: 'Go Global for Less',
    description:
      'Europe, Asia, Americas, or island hopping—no destination is off limits when you book with SkySaver.'
  },
  {
    icon: '🤝',
    title: 'Personal Travel Partners',
    description: 'Two friends on a mission: align your dream itinerary with a price you love.'
  }
];

const testimonials = [
  {
    initials: 'AG',
    name: 'Rovan Wilson',
    role: 'Student',
    location: 'New York, USA',
    rating: 5,
    savings: '38%',
    destination: 'Europe',
    quote: 'They slashed my Europe ticket by 38%. The process felt personal, fast, and surprisingly fun!',
    verified: true,
    date: '2 weeks ago'
  },
  {
    initials: 'DV',
    name: 'Dev Vyas',
    role: 'Startup Founder',
    location: 'San Francisco, USA',
    rating: 5,
    savings: '52%',
    destination: 'Business Class',
    quote: 'Found business class rates cheaper than economy. These guys know where the hidden deals live.',
    verified: true,
    date: '1 month ago'
  },
  {
    initials: 'LS',
    name: 'Lina Shah',
    role: 'Family Planner',
    location: 'London, UK',
    rating: 5,
    savings: '45%',
    destination: 'Bali',
    quote: 'Our family of five flew to Bali for less than a surprise weekend city break. Unreal service.',
    verified: true,
    date: '3 weeks ago'
  },
  {
    initials: 'JT',
    name: 'Jared Thompson',
    role: 'Remote Nomad',
    location: 'Barcelona, Spain',
    rating: 5,
    savings: '41%',
    destination: 'Multiple Cities',
    quote: 'When Wi-Fi is life, you need pros like this to keep your itinerary agile and on budget.',
    verified: true,
    date: '1 week ago'
  }
];

const advisors = [
  {
    name: 'Jeeson Jose',
    role: 'Flight Deal Architect',
    quote: '“I specialize in premium cabins and complex itineraries. Tell me the dream route— I’ll make it real.”',
    whatsapp:
      'https://api.whatsapp.com/send?phone=916282272129&text=Hello%20Jeeson%20%F0%9F%91%8B%2C%20I%20want%20to%20book%20a%20flight.%20Please%20help%20me%20with%20the%20details.%0A',
    instagram: 'https://www.instagram.com/_jeeson_jose/'
  },
  {
    name: 'Anoop kumar',
    role: 'Fare Strategist',
    quote: '“Obsessed with timing flash sales and stacking hidden deals. Ping me when you want results fast.”',
    whatsapp:
      'https://api.whatsapp.com/send?phone=917025768294&text=Hello%20Anoop%F0%9F%91%8B%2C%20I%20want%20to%20book%20a%20flight.%20Please%20help%20me%20with%20the%20details.',
    instagram: 'https://www.instagram.com/a_n_0_0_pz/'
  }
];

const WhatsappIcon = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.04 2C6.585 2 2.167 6.42 2.167 11.874c0 2.104.618 3.995 1.766 5.61L2 22l4.65-1.498c1.54.847 3.292 1.296 5.09 1.296h.003c5.456 0 9.874-4.42 9.874-9.873C21.618 6.421 17.499 2 12.04 2Zm4.815 13.44c-.203.57-1.183 1.128-1.635 1.18-.419.048-.953.067-1.54-.094-.356-.094-.81-.263-1.401-.515-2.465-1.064-4.073-3.54-4.198-3.7-.123-.16-1-1.333-1-2.544s.632-1.803.856-2.053c.224-.248.59-.36.778-.36.188 0 .389.003.561.01.18.009.42-.068.658.502.24.57.816 1.962.889 2.103.074.14.123.304.023.492-.098.188-.148.304-.297.468-.15.162-.315.363-.45.488-.15.15-.306.313-.131.614.176.3.78 1.281 1.675 2.073 1.15 1.025 2.12 1.347 2.42 1.497.3.148.473.124.65-.074.176-.198.75-.87.951-1.168.2-.298.4-.249.657-.15.257.1 1.632.77 1.912.908.28.138.467.205.539.318.074.114.074.659-.129 1.229Z" />
  </svg>
);

const airlines = [
  {
    id: 'singapore',
    name: 'Singapore Airlines',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium travel experience with world-class service across Asia and beyond.',
    route: 'Any Destination',
    price: 'Best Price Available'
  },
  {
    id: 'malaysian',
    name: 'Malaysian Airlines',
    country: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=80',
    description: 'Discover Southeast Asia with affordable luxury and exceptional hospitality.',
    route: 'Your Preferred Route',
    price: 'Price on Request'
  },
  {
    id: 'vietjet',
    name: 'VietJet Air',
    country: 'Vietnam',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    description: 'Budget-friendly flights connecting Vietnam to destinations across Asia.',
    route: 'Worldwide Flight Access',
    price: 'Flexible Fare Options'
  },
  {
    id: 'indigo',
    name: 'IndiGo',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    description: 'India\'s largest airline offering reliable and affordable domestic and international flights.',
    route: 'Your Preferred Route',
    price: 'Price on Request'
  },
  {
    id: 'qantas',
    name: 'Qantas',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    description: 'Australia\'s flagship carrier connecting you to the world with award-winning service.',
    route: 'Any Destination',
    price: 'Best Price Available'
  },
  {
    id: 'emirates',
    name: 'Emirates',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1200&q=80',
    description: 'Luxury flying experience with premium amenities and global destinations.',
    route: 'Worldwide Flight Access',
    price: 'Flexible Fare Options'
  }
];

function App(): JSX.Element {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [visibleHighlights, setVisibleHighlights] = useState<boolean[]>([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showAllAirlines, setShowAllAirlines] = useState(false);
  const testimonialsRef = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLElement>(null);
  
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 4
      })),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardElement = entry.target as HTMLElement;
            const index = parseInt(cardElement.dataset.index || '0', 10);
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 150); // Stagger animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const cards = testimonialsRef.current?.querySelectorAll('.testimonial-card');
    cards?.forEach((card, index) => {
      (card as HTMLElement).dataset.index = index.toString();
      observer.observe(card);
    });

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardElement = entry.target as HTMLElement;
            const index = parseInt(cardElement.dataset.index || '0', 10);
            setTimeout(() => {
              setVisibleHighlights((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 120); // Stagger animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    const highlightCards = highlightsRef.current?.querySelectorAll('.highlight-card-modern');
    highlightCards?.forEach((card, index) => {
      (card as HTMLElement).dataset.index = index.toString();
      observer.observe(card);
    });

    return () => {
      highlightCards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = (): void => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileView(isMobile);
      setShowAllAirlines(!isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-midnight text-slate-50 font-body">
      <header className="relative flex min-h-screen flex-col justify-between overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-deepsea to-midnight">
          {/* Animated Gradient Orbs */}
          <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] animate-float rounded-full bg-aurora/20 blur-[120px] [animation-delay:0s]" />
          <div className="absolute right-[15%] top-[40%] h-[600px] w-[600px] animate-float rounded-full bg-skywave/25 blur-[140px] [animation-delay:2s]" />
          <div className="absolute left-[50%] bottom-[20%] h-[450px] w-[450px] animate-float rounded-full bg-blossom/20 blur-[100px] [animation-delay:4s]" />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]" />
          
          {/* Check Tile Pattern */}
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  rgba(45,212,191,0.1) 0px,
                  rgba(45,212,191,0.1) 40px,
                  transparent 40px,
                  transparent 80px
                ),
                repeating-linear-gradient(
                  -45deg,
                  rgba(45,212,191,0.1) 0px,
                  rgba(45,212,191,0.1) 40px,
                  transparent 40px,
                  transparent 80px
                )
              `,
              backgroundSize: '80px 80px',
              backgroundPosition: '0 0',
              maskImage: 'radial-gradient(ellipse 100% 70% at 50% 0%, black 30%, transparent 100%)'
            }}
          />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-aurora/40 animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              />
            ))}
          </div>
          
          {/* Animated Light Rays */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-aurora/50 to-transparent animate-[shimmer_8s_ease-in-out_infinite]" />
            <div className="absolute right-[20%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-skywave/50 to-transparent animate-[shimmer_10s_ease-in-out_infinite_2s]" />
            <div className="absolute right-[40%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-blossom/50 to-transparent animate-[shimmer_12s_ease-in-out_infinite_4s]" />
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.15),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(96,165,250,0.15),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(244,114,182,0.1),transparent_50%),linear-gradient(to_bottom,rgba(4,7,20,0.4),rgba(4,7,20,0.7))]" />
        
        {/* Animated Border Glow */}
        <div className="absolute inset-0 border border-aurora/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aurora/5 to-transparent animate-[borderGlow_6s_ease-in-out_infinite]" />
        </div>

        <nav className="relative z-30 flex flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-16">
          <span className="text-xs font-semibold uppercase tracking-[0.45em] text-white/90 lg:text-sm">
            SkySaver
          </span>

          <ul className="hidden flex-1 items-center justify-center gap-10 text-sm font-medium text-white/80 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 text-white/80 transition hover:border-aurora hover:text-aurora lg:hidden"
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span
                className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${
                  isNavOpen ? 'translate-y-1 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-current transition duration-300 ${
                  isNavOpen ? 'opacity-0' : 'opacity-100'
                } `}
              />
              <span
                className={`block h-[2px] w-5 bg-current transition-transform duration-300 ${
                  isNavOpen ? '-translate-y-1 -rotate-45' : ''
                }`}
              />
            </button>

            <a
              className="hidden btn-primary shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_45px_rgba(45,212,191,0.25)] sm:inline-flex"
              href="#contact"
            >
              Book With Us
            </a>
          </div>
        </nav>

        <div
          className={`lg:hidden fixed inset-0 z-20 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsNavOpen(false)}
        />

        <div
          className={`lg:hidden fixed inset-x-4 top-4 z-30 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ${
            isNavOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-white/90">SkySaver</span>
            <button
              type="button"
              aria-label="Close navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-aurora hover:text-aurora"
              onClick={() => setIsNavOpen(false)}
            >
              ✕
            </button>
          </div>
          <ul className="mt-6 space-y-4 text-sm font-medium text-white/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="block rounded-2xl px-4 py-3 text-center transition hover:bg-white/5"
                  href={link.href}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-aurora to-skywave px-6 py-3 text-xs font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5"
            href="#contact"
            onClick={() => setIsNavOpen(false)}
          >
            Book With Us
          </a>
        </div>

        <div className="relative z-10 max-w-4xl px-6 pb-16 pt-10 sm:pb-32 lg:px-16 lg:pt-24">
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Cheap, Low-Cost Flights
            <span className="block text-aurora drop-shadow-[0_0_18px_rgba(45,212,191,0.45)]">
              Anywhere. Anytime.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80 sm:text-xl">
            Personalized flight hunting by two passionate travelers. We chase the lowest fares so you can chase the
            world.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a className="btn-primary shadow-glow" href="#contact">
              Start Your Journey
            </a>
            <a
              className="btn-ghost border border-white/30 bg-white/10 text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              href="#highlights"
            >
              See Why We&apos;re Different
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg gap-6 sm:grid-cols-3 sm:max-w-none">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <dt className="text-2xl font-semibold text-skywave">{stat.value}</dt>
                <dd className="mt-2 text-sm text-white/70">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main>
        <section 
          ref={highlightsRef}
          id="highlights" 
          className="section-wrapper relative overflow-hidden bg-gradient-to-b from-slate-900 via-midnight to-slate-900"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[5%] top-[10%] h-[300px] w-[300px] animate-float rounded-full bg-skywave/10 blur-[80px] [animation-delay:0s]" />
            <div className="absolute right-[10%] bottom-[15%] h-[350px] w-[350px] animate-float rounded-full bg-aurora/8 blur-[90px] [animation-delay:2s]" />
            <div className="absolute left-[50%] top-[50%] h-[250px] w-[250px] animate-float rounded-full bg-blossom/8 blur-[70px] [animation-delay:4s]" />
          </div>

          <div className="relative z-10">
            <div className="section-heading">
              <h2 className="relative inline-block">
                <span className="relative z-10">Flight Deal Highlights</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-skywave/20 via-aurora/20 to-blossom/20 blur-xl" />
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Why travelers trust us to find the perfect trip at the lowest price.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item, index) => (
                <article
                  key={item.title}
                  data-index={index}
                  className={`highlight-card-modern group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.06] to-white/[0.03] p-8 backdrop-blur-2xl transition-all duration-700 ${
                    visibleHighlights[index]
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-16 opacity-0 scale-95'
                  } hover:-translate-y-2 hover:border-aurora/50 hover:shadow-[0_25px_60px_rgba(45,212,191,0.12)] hover:scale-[1.02]`}
                  style={{
                    borderWidth: '0.5px',
                    transitionDelay: visibleHighlights[index] ? `${index * 0.1}s` : '0s'
                  }}
                >
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-aurora/0 via-skywave/0 to-blossom/0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:from-aurora/25 group-hover:via-skywave/25 group-hover:to-blossom/25 blur-md" />
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-[3px] -z-10 rounded-3xl bg-gradient-to-r from-aurora via-skywave to-blossom opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-20" />

                  {/* Icon Container with Animation */}
                  <div className="relative mb-6 inline-flex">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-aurora/30 via-skywave/30 to-blossom/30 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora/20 via-skywave/20 to-white/10 text-4xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                      <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-bold text-white transition-colors duration-300 group-hover:text-aurora">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/90">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-aurora via-skywave to-blossom transition-all duration-700 group-hover:w-full" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer-slow" />
                  </div>

                  {/* Floating Particles Effect */}
                  <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-aurora/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-pulse" />
                  <div className="absolute bottom-6 right-8 h-1.5 w-1.5 rounded-full bg-skywave/40 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-hover:animate-pulse [animation-delay:0.3s]" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="map"
          className="section-wrapper relative overflow-hidden bg-[#0A1020]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] animate-float rounded-full bg-aurora/10 blur-[100px] [animation-delay:0s]" />
            <div className="absolute right-[15%] bottom-[20%] h-[500px] w-[500px] animate-float rounded-full bg-skywave/10 blur-[120px] [animation-delay:3s]" />
          </div>

          <div className="relative z-10">
            <div className="section-heading space-y-4 text-white mb-12 text-center">
              <h2>Anywhere, Anytime, Any Flight</h2>
              <p className="text-white/80">
                Real humans, real-time searching. We scan the globe for the cheapest routes and make them yours.
              </p>
            </div>

            {/* Globe and Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
              {/* Globe Component - Left Side */}
              <div className="relative w-full max-w-[280px] mx-auto aspect-square lg:max-w-none lg:aspect-auto lg:h-[450px] order-2 lg:order-1 flex items-center justify-center">
                <GlobeDemo />
              </div>

              {/* Content - Right Side */}
              <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Global Flight Network
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Our extensive network spans across continents, connecting you to destinations worldwide. 
                    From major cities to hidden gems, we find the best routes at unbeatable prices.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3">
                      <span className="text-aurora text-xl mt-1">✈️</span>
                      <span className="text-white/90">Real-time flight tracking across 100+ countries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-aurora text-xl mt-1">🌍</span>
                      <span className="text-white/90">Direct connections to major travel hubs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-aurora text-xl mt-1">💰</span>
                      <span className="text-white/90">Exclusive deals on premium airlines</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a 
                    className="inline-flex items-center btn-glow border border-white/30 bg-slate-900/70 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300" 
                    href="#contact"
                  >
                    <span>Explore Destinations</span>
                    <span className="ml-2">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Card Demo Section */}
        <section
          id="3d-card"
          className="section-wrapper relative overflow-hidden bg-[#0A1020]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] animate-float rounded-full bg-aurora/10 blur-[100px] [animation-delay:0s]" />
            <div className="absolute right-[15%] bottom-[20%] h-[500px] w-[500px] animate-float rounded-full bg-skywave/10 blur-[120px] [animation-delay:3s]" />
            <div className="absolute left-[50%] top-[50%] h-[350px] w-[350px] animate-float rounded-full bg-blossom/8 blur-[90px] [animation-delay:2s]" />
          </div>

          <div className="relative z-10">
            <div className="section-heading">
              <h2 className="relative inline-block">
                <span className="relative z-10">Experience Our Technology</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-aurora/20 via-skywave/20 to-blossom/20 blur-xl" />
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Browse our exclusive flight deals with interactive 3D cards. Hover to explore!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-10 max-w-7xl mx-auto">
              {(isMobileView && !showAllAirlines ? airlines.slice(0, 2) : airlines).map((airline) => (
                <CardContainer key={airline.id} className="inter-var">
                  <CardBody className="relative group/card bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] border-white/[0.2] w-full h-auto rounded-3xl p-6 border backdrop-blur-2xl hover:shadow-2xl hover:shadow-aurora/20 transition-all duration-300">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-white mb-2"
                    >
                      {airline.name}
                    </CardItem>
                    <CardItem
                      translateZ="40"
                      className="text-sm font-medium text-aurora mb-3"
                    >
                      {airline.country}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-white/70 text-xs leading-relaxed mb-4"
                    >
                      {airline.description}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mb-4">
                      <img
                        src={airline.image}
                        height="400"
                        width="600"
                        className="h-48 w-full object-cover rounded-2xl group-hover/card:shadow-xl border border-white/10"
                        alt={`${airline.name} aircraft`}
                      />
                    </CardItem>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                      <div>
                        <CardItem
                          translateZ={30}
                          className="text-sm font-semibold text-white"
                        >
                          {airline.route}
                        </CardItem>
                      </div>
                      <div className="text-right">
                        <CardItem
                          translateZ={30}
                          className="text-base font-bold text-aurora"
                        >
                          {airline.price}
                        </CardItem>
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-3">
                      <CardItem
                        translateZ={20}
                        as="a"
                        href="#contact"
                        className="px-4 py-2 rounded-xl text-xs font-normal text-white/80 hover:text-aurora transition-colors"
                      >
                        Details →
                      </CardItem>
                      <CardItem
                        translateZ={20}
                        as="a"
                        href="#contact"
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-aurora via-skywave to-blossom text-white text-xs font-bold hover:shadow-lg hover:shadow-aurora/30 transition-all flex-1 text-center"
                      >
                        Book Now
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
            {isMobileView && (
              <div className=" relative -mb-[7rem] -top-[5.4rem] flex justify-center lg:hidden">
                <button
                  className="rounded-full border border-white/30 px-6 py-2 text-xs font-semibold text-white/80 transition hover:border-aurora hover:text-aurora"
                  onClick={() => setShowAllAirlines((prev) => !prev)}
                >
                  {showAllAirlines ? 'Show Less' : 'View All Airlines'}
                </button>
              </div>
            )}
          </div>
        </section>

        <section 
          ref={testimonialsRef}
          id="ratings" 
          className="section-wrapper relative overflow-hidden bg-[#0A1020]"
        >
          {/* Animated Background Elements */}
         

          <div className="relative z-10">
            <div className="section-heading">
              <h2 className="relative inline-block">
                <span className="relative z-10">What Our Travelers Say</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-aurora/20 via-skywave/20 to-blossom/20 blur-xl" />
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Real stories from clients who caught flights, not feelings for high prices.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {testimonials.map((item, index) => (
                <article
                  key={item.name}
                  data-index={index}
                  className={`testimonial-card group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] p-6 backdrop-blur-2xl transition-all duration-700 ${
                    visibleCards[index]
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  } hover:-translate-y-3 hover:border-aurora/40 hover:shadow-[0_20px_60px_rgba(45,212,191,0.15)]`}
                  style={{
                    transitionDelay: visibleCards[index] ? `${index * 0.1}s` : '0s'
                  }}
                >
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-aurora/0 via-skywave/0 to-blossom/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-aurora/30 group-hover:via-skywave/30 group-hover:to-blossom/30 blur-sm" />
                  
                  {/* Glow Effect */}
                  <div className="absolute -inset-[2px] -z-10 rounded-3xl bg-gradient-to-r from-aurora via-skywave to-blossom opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30" />

                  {/* Card Content */}
                  <div className="relative z-10">
                    <header className="mb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Animated Avatar */}
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora/40 to-skywave/40 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-aurora/30 via-skywave/30 to-blossom/30 text-lg font-bold uppercase tracking-wide text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                              {item.initials}
                            </div>
                            {item.verified && (
                              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-aurora text-xs text-white shadow-lg">
                                ✓
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-aurora">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs font-medium text-white/70">{item.role}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs text-white/50">{item.location}</span>
                              <span className="h-1 w-1 rounded-full bg-white/30" />
                              <span className="text-xs text-white/50">{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </header>

                    {/* Animated Star Rating */}
                    <div className="mb-5 flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400 transition-all duration-300 group-hover:scale-125"
                          style={{ transitionDelay: `${i * 0.05}s` }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-4xl font-serif leading-none text-aurora/20">
                        "
                      </div>
                      <p className="relative text-[15px] leading-relaxed text-white/90 transition-colors duration-300 group-hover:text-white">
                        {item.quote}
                      </p>
                    </blockquote>

                    {/* Badge Section */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-aurora/20 to-skywave/20 px-3 py-1.5 text-xs font-semibold text-aurora backdrop-blur-sm">
                        <span className="text-green-400">💰</span>
                        Saved {item.savings}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                        <span className="text-blue-400">✈️</span>
                        {item.destination}
                      </span>
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer-slow" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="section-wrapper"
          style={{
            background:
              'radial-gradient(circle at bottom, rgba(244, 114, 182, 0.2), transparent 55%), linear-gradient(to bottom, #0a1428, #020617)'
          }}
        >
          <div className="section-heading">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-aurora" />
              Support Desk
            </div>
            <h2 className="mt-4">Let’s Plan Your Next Flight</h2>
            <p>Share your dream route. We’ll respond with the cheapest options faster than any search engine.</p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent p-6 shadow-glow">
                <div className="flex flex-wrap items-center gap-4 text-white/70">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">Avg Response</p>
                    <p className="text-2xl font-semibold text-white">18 min</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">Deals Secured</p>
                    <p className="text-2xl font-semibold text-white">2.5K+</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">24/7</p>
                    <p className="text-2xl font-semibold text-white">Human Desk</p>
                  </div>
                </div>
              </div>

              <form className="hidden md:grid gap-6 rounded-[26px] border border-white/15 bg-slate-950/70 p-10 shadow-[0_35px_80px_rgba(2,6,23,0.65)] backdrop-blur-3xl md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wide text-white/70" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-field"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wide text-white/70" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-field"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@email.com"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wide text-white/70" htmlFor="destination">
                    Destination &amp; Dates
                  </label>
                  <input
                    className="form-field"
                    type="text"
                    id="destination"
                    name="destination"
                    placeholder="Where to? When?"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-wide text-white/70" htmlFor="budget">
                    Budget &amp; Cabin Preference
                  </label>
                  <input
                    className="form-field"
                    type="text"
                    id="budget"
                    name="budget"
                    placeholder="e.g. $1200, Business Class"
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold uppercase tracking-wide text-white/70" htmlFor="message">
                    What matters most?
                  </label>
                  <textarea
                    className="form-field min-h-[150px]"
                    id="message"
                    name="message"
                    placeholder="Budget, airlines you love, schedule needs..."
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <button className="btn-primary w-full" type="submit">
                    Send Request
                  </button>
                  <p className="mt-3 text-center text-xs uppercase tracking-[0.35em] text-white/40">
                    We reply with 3 curated options in under an hour
                  </p>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-aurora/10 via-transparent to-skywave/10 p-6 text-white shadow-glow">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Why message us?</p>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li>• Fare stacking tactics airlines never advertise</li>
                  <li>• Real humans monitoring 70+ booking systems</li>
                  <li>• We rebook you instantly if fares fluctuate</li>
                </ul>
              </div>

              {advisors.map((advisor) => (
                <article
                  key={advisor.name}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_70px_rgba(2,6,23,0.6)] backdrop-blur-2xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-aurora/40 via-skywave/40 to-blossom/40 text-base font-semibold text-white">
                        {advisor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{advisor.name}</h3>
                        <p className="text-sm text-white/60">{advisor.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
                      Online
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-white/80">{advisor.quote}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-xs font-semibold text-slate-900 shadow-[0_12px_25px_rgba(37,211,102,0.35)] transition hover:brightness-110"
                      href={advisor.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappIcon />
                      WhatsApp
                    </a>
                    <a
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f472b6] to-[#ec4899] px-5 py-2 text-xs font-semibold text-white shadow-[0_12px_25px_rgba(244,114,182,0.35)] transition hover:brightness-110"
                      href={advisor.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-[#050915] px-6 py-14 text-sm text-white/70 lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0c162f]/40 to-[#050915]" />
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h3 className="font-display text-xl text-white">SkySaver </h3>
            <p className="mt-3 text-white/70">
              Two flight hunters cutting costs, not corners. We combine human expertise with real-time tech to uncover the
              smartest flight deals on the planet.
            </p>

            <div className="mt-6 space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-aurora" />
                <a className="transition hover:text-aurora" href="mailto:skysaver121@gmail.com">
                skysaver121@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 row-auto">
                <Phone className="h-4 w-4 text-skywave" />
                <a className="transition hover:text-aurora" href="https://api.whatsapp.com/send?phone=916282272129&text=Hello%20Jeeson%20%F0%9F%91%8B%2C%20I%20want%20to%20book%20a%20flight.%20Please%20help%20me%20with%20the%20details.%0A" target="_blank" rel="noopener">
                  +91 6282272129
                </a>
              </div>
              <div className="flex items-center gap-3 row-auto">
              <Phone className="h-4 w-4 text-skywave" />
                <a className="transition hover:text-aurora" href="https://api.whatsapp.com/send?phone=917025768294&text=Hello%20Anoop%F0%9F%91%8B%2C%20I%20want%20to%20book%20a%20flight.%20Please%20help%20me%20with%20the%20details." target="_blank" rel="noopener">
                  +91 7025768294
                </a>
                </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com/skysaver', label: 'Instagram' },
                {
                  icon: WhatsappIcon,
                  href: 'https://api.whatsapp.com/send?phone=916282272129&text=Hello%20Jeeson%20%F0%9F%91%8B%2C%20I%20want%20to%20book%20a%20flight.%20Please%20help%20me%20with%20the%20details.%0A',
                  label: 'WhatsApp Jeeson'
                },
                {
                  icon: WhatsappIcon,
                  href: 'https://api.whatsapp.com/send?phone=917025768294&text=Hello%20Anoop%F0%9F%91%8B%2C%20I%20want%20to%20book%20a%20flight.%20Please%20help%20me%20with%20the%20details.',
                  label: 'WhatsApp Anoop'
                }
               ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  aria-label={label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-border-aurora text-base transition hover:border-aurora hover:text-aurora"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Quick Links</p>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>
                <a className="transition hover:text-aurora" href="#highlights">
                  Highlights
                </a>
              </li>
              <li>
                <a className="transition hover:text-aurora" href="#map">
                  Anywhere Anytime
                </a>
              </li>
              <li>
                <a className="transition hover:text-aurora" href="#ratings">
                  Client Love
                </a>
              </li>
              <li>
                <a className="transition hover:text-aurora" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Flight Services</p>
            <ul className="mt-4 space-y-3 text-white/70">
              <li>Premium Cabin Deals</li>
              <li>Multi-city Itineraries</li>
              <li>Group & Corporate Travel</li>
              <li>Last-minute Fare Alerts</li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} SkySaver. Anywhere. Anytime. Any Flight.</span>
            <span className="text-white/40">Privacy · Terms · Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


