export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Properties for Sale", href: "/properties?purpose=SALE" },
  { label: "Properties for Rent", href: "/properties?purpose=RENT" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const FOOTER_NAVIGATION = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Properties for Sale", href: "/properties?purpose=SALE" },
      { label: "Properties for Rent", href: "/properties?purpose=RENT" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Popular Cities",
    links: [
      { label: "New Cairo", href: "/sale/new-cairo" },
      { label: "Fifth Settlement", href: "/sale/new-cairo/fifth-settlement" },
      { label: "Sheikh Zayed", href: "/sale/sheikh-zayed" },
      { label: "Maadi", href: "/sale/cairo/maadi" },
    ],
  },
] as const;
