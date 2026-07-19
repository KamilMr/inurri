

export const siteConfig = {
  name: 'Inurri',
  description: 'Strony i aplikacje internetowe dopasowane do potrzeb biznesu.',
  logo: {
    src: '/img/inurri_pen.svg',
    srcDark: '/img/inurri_white_simple.svg',       // Used when strategy is 'switch'
    alt: 'Inurri Logo',
    strategy: 'switch' as 'invert' | 'switch' | 'static', // 'invert' | 'switch' | 'static'
  },
  ogImage: '/og-image.webp',
  primaryColor: '#06b6d4', // Primary accent color used for tints, shadows, and text accents
  search: {
    enabled: false,
  },
  announcement: {
    enabled: false,
    id: 'inurri_announcement', // Change this ID to reshow the banner
    link: '',
    localizeLink: true, // Set to true to apply i18n routing to the link, false for external/absolute links
  },
  blog: {
    postsPerPage: 6,
  },
  contact: {
    email: {
      support: '',
      sales: '',
    },
    phone: {
      main: '',
      label: ''
    },
    address: {
      city: 'Polska',
      full: 'Polska'
    }
  },
  analytics: {
    alwaysLoad: import.meta.env.ANALYTICS_ALWAYS_LOAD === 'true',
    vendors: {
      googleAnalytics: {
        id: import.meta.env.GA_ID || '',
        enabled: import.meta.env.GA_ENABLED === 'true',
      },
      rybbit: {
        id: import.meta.env.RYBBIT_ID || '',
        src: import.meta.env.RYBBIT_SRC || 'https://rybbit.example.com/api/script.js',
        enabled: import.meta.env.RYBBIT_ENABLED === 'true',
      },
      umami: {
        id: import.meta.env.UMAMI_ID || '',
        src: import.meta.env.UMAMI_SRC || 'https://analytics.umami.is/script.js',
        enabled: import.meta.env.UMAMI_ENABLED === 'true',
      },
    },
  },
  dateOptions: {
    localeMapping: {
        'ar': 'ar-TN', // Force Maghreb Arabic date format (e.g., جانفي instead of يناير)
        'en': 'en-GB', // Example: Force UK English date format
    }
  }
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  {
    href: '/features',
    label: 'Product',
    children: [
      { href: '/features', label: 'Features', description: 'Services and capabilities', icon: 'Zap' },
      { href: '/pricing', label: 'Pricing', description: 'Flexible pricing starting points', icon: 'CreditCard' },
    ],
  },
  { href: '/portfolio', label: 'Work' },
  { href: '/changelog', label: 'Changelog' },
  {
    href: '/about',
    label: 'Company',
    children: [
      { href: '/about', label: 'About', description: 'Story and way of working', icon: 'Building2' },
      { href: '/contact', label: 'Contact', description: 'Get in touch with me', icon: 'Mail' },
    ],
  },
];

export const ACTION_LINKS = {
  primary: { label: 'Contact', href: '/contact' },
  social: {
    twitter: '',
    linkedin: '',
    github: '',
    youtube: '',
    facebook: ''

  }
};

export const FOOTER_LINKS = {
  product: {
    title: 'Product',
    links: [
      { href: '/features', label: 'Features', hidden: true },
      { href: '/about', label: 'About', hidden: true },
      { href: '/pricing', label: 'Pricing', hidden: true },
      { href: '/changelog', label: 'Changelog', hidden: true },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms', localize: false }
    ],
  },
};
