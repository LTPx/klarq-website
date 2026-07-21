import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.klarq.eu",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
   async redirects() {
    return [
      {
        source: "/",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/studio",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/conferenciaestetassostenibles",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/journal",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/press",
        destination: "/es/publications",
        permanent: true,
      },
      {
        source: "/publicacionarquitecturaydiseno",
        destination: "/es/publications",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/es/contact",
        permanent: true,
      },
      {
        source: "/objects",
        destination: "/es/architecture",
        permanent: true,
      },
      {
        source: "/projects/spa",
        destination: "/es/decor",
        permanent: true,
      },
      {
        source: "/en/blog",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/projects",
        destination: "/en",
        permanent: true,
      },
            {
        source: "/en/studio",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/journal",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/politicas-privacidad",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/en/press",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/en/objects",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/projects/lamour",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/en/home",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/contacto",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/projects/son-maig",
        destination: "/es/development/son-maig",
        permanent: true,
      },
      {
        source: "/projects/can-duarte",
        destination: "/es/architecture",
        permanent: true,
      },
      // {
      //   source: "/en/privacy-policy/",
      //   destination: "/en",
      //   permanent: true,
      // },
      {
        source: "/objects/banera-ibiza",
        destination: "/es/decor",
        permanent: true,
      },
      {
        source: "/projects/tres-cantos",
        destination: "/es/architecture/tres-cantos",
        permanent: true,
      },
      {
        source: "/projects/lamour",
        destination: "/es/architecture",
        permanent: true,
      },
      {
        source: "/en/ecological-construction/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/objects/mesa-codolar",
        destination: "/es/decor",
        permanent: true,
      },
      {
        source: "/projects/gathering-ibiza",
        destination: "/es/architecture",
        permanent: true,
      },
      {
        source: "/projects/spa/",
        destination: "/es/decor",
        permanent: true,
      },
      {
        source: "/arquitectura-diseno-260",
        destination: "/es/publications",
        permanent: true,
      },
      {
        source: "/estudio-arquitectura-ibiza-mallorca",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/en/blog/page/2",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/nuestra-publicacion-en-sabato",
        destination: "/es/publications",
        permanent: true,
      },
      {
        source: "/en/projects/tres-cantos",
        destination: "/en/architecture/tres-cantos",
        permanent: true,
      },
      {
        source: "/en/sustainable-aesthetics-conference",
        destination: "/en",
        permanent: true,
      },
         {
        source: "/en/projects/can-miquel",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/en/projects/son-maig",
        destination: "/en/development/son-maig",
        permanent: true,
      },
      {
        source: "/en/objects/mesa-pc",
        destination: "/en/decor",
        permanent: true,
      },
      {
        source: "/en/objects/lavabo-eva",
        destination: "/en/decor",
        permanent: true,
      },
      {
        source: "/en/objects/banera-ibiza",
        destination: "/en/decor",
        permanent: true,
      },
      {
        source: "/en/architecture-studio-ibiza-mallorca",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/refurbishing-a-borda-in-benasque",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/breathe-easy-passivhaus-is-health",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/rehabilitation-of-a-spa",
        destination: "/en/decor",
        permanent: true,
      },
      {
        source: "/en/our-feature-in-sabato",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/nuestra-publicacion-en-nan-arquitectura",
        destination: "/es/architecture",
        permanent: true,
      },
      {
        source: "/en/our-feature-in-sabato",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/cost-difference-sustainable-vs-conventional",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/en/refurbishing-a-borda-in-benasque",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/a-parcial-versus-a-global-project",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/en/cost-difference-sustainable-vs-conventional",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/son-maig-a-passive-house-in-mallorca",
        destination: "/es/development/son-maig",
        permanent: true,
      },
      {
        source: "/casa-aruma-architecture-and-design-in-mallorca",
        destination: "/es/architecture",
        permanent: true,
      },
      {
        source: "/a-parcial-versus-a-global-project",
        destination: "/es/architecture",
        permanent: true,
      },
      {
        source: "/en/pc-table-by-klarq-architecture-atelier",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/the-eva-washbasin-designed-by-klarq",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/en/son-maig-a-passive-house-in-mallorca",
        destination: "/en/development/son-maig",
        permanent: true,
      },
      {
        source: "/en/casa-aruma-architecture-and-design-in-mallorca",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/en/our-latest-publication-in-arquitectura-y-diseno",
        destination: "/en/publications",
        permanent: true,
      },
      {
        source: "/ca-na-lola-passivhaus-and-discreet-luxury-in-mallorca",
        destination: "/es/architecture/ca-na-lola",
        permanent: true,
      },
      {
        source: "/en/ca-na-lola-passivhaus-and-discreet-luxury-in-mallorca",
        destination: "/en/architecture/ca-na-lola",
        permanent: true,
      },
      {
        source: "/en/projects/lamour",
        destination: "/en/architecture",
        permanent: true,
      },
      {
        source: "/en/projects/spa",
        destination: "/en/decor",
        permanent: true,
      },
      {
        source: "/en/a-parcial-versus-a-global-project",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
