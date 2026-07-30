export type GearItem = {
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  productUrl: string;
  details: string[];
};

export const gear: GearItem[] = [
  {
    name: 'ASUS TUF Gaming A15',
    category: 'Main Computer',
    description: 'My primary laptop for web development, design work, testing, and everyday project building.',
    image: 'https://dlcdnwebimgs.asus.com/gain/d4227aa9-982d-461c-8800-2f6db3eafe6a/w800/fwebp',
    imageAlt: 'ASUS TUF Gaming A15 laptop',
    productUrl: 'https://www.asus.com/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-a15-2023/',
    details: ['Web development', 'Design and testing', 'Daily driver'],
  },
  {
    name: 'Redragon Kumara K552RGB-2 Wired Mechanical Keyboard',
    category: 'Keyboard',
    description:
      'A compact mechanical keyboard that keeps the desk focused and comfortable during long coding sessions.',
    image: `${import.meta.env.BASE_URL}/images/gear/redragon-k552rgb-2.png`,
    imageAlt: 'Redragon Kumara K552RGB-2 wired mechanical keyboard',
    productUrl: 'https://redragonshop.com/products/redragon-kumara-k552',
    details: ['87-key TKL layout', 'RGB backlight', 'Wired USB'],
  },
  {
    name: 'Attack Shark X11 SE Wireless Gaming Mouse',
    category: 'Mouse',
    description: 'A wireless mouse for moving between coding, design details, and general work without desk clutter.',
    image: `${import.meta.env.BASE_URL}/images/gear/attack-shark-x11-se.png`,
    imageAlt: 'Attack Shark X11 SE wireless gaming mouse',
    productUrl:
      'https://attackshark.com.ph/products/attack-shark-x11se-wireless-gaming-mouse?shpxid=4e494a38-a85f-41a1-b922-93797dbe92d2&variant=50236504637738',
    details: ['Tri-mode wireless', '59g lightweight', 'Work and gaming'],
  },
];
