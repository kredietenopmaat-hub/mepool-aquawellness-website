export type ProductImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type Product = {
  id: string
  category: string
  title: string
  description: string
  images: ProductImage[]
  features: string[]
  specifications: { label: string; value: string }[]
  price: string
  badge: string | null
}

const catalogProducts = [
  {
    id: "warmtepompen",
    category: "Verwarming",
    title: "Warmtepompen",
    description: "Energie-efficiënte warmtepompen voor een aangenaam verwarmde zwembad het hele jaar door. Onze premium warmtepompen besparen tot 80% op uw verwarmingskosten.",
    image: "/images/heat-pump.jpg",
    features: [
      "Tot 80% energiebesparing",
      "Fluisterstil in werking",
      "Geschikt voor alle zwembadtypes",
      "5 jaar garantie",
      "Professionele installatie inbegrepen",
    ],
    priceFrom: "2.490",
    badge: "Bestseller",
  },
  {
    id: "rolluiken",
    category: "Veiligheid",
    title: "Zwembad Rolluiken",
    description: "Veilige en elegante rolluiken die uw zwembad beschermen tegen vervuiling en de warmte vasthouden. Beschikbaar in automatische en manuele uitvoering.",
    image: "/images/pool-cover.jpg",
    features: [
      "Automatisch of manueel bedienbaar",
      "Kindveilig conform NF P90-308",
      "Vermindert warmteverlies tot 70%",
      "UV-bestendig materiaal",
      "Op maat gemaakt",
    ],
    priceFrom: "3.990",
    badge: "Populair",
  },
  {
    id: "infrarood",
    category: "Wellness",
    title: "Infrarood Cabines",
    description: "Premium infrarood cabines voor diepe ontspanning en gezondheidsvoordelen. Geniet van spa-kwaliteit wellness in uw eigen huis.",
    image: "/images/infrared-cabin.jpg",
    features: [
      "Full-spectrum infrarood",
      "Massief houten constructie",
      "Bluetooth audiosysteem",
      "Chromotherapie verlichting",
      "Laag energieverbruik",
    ],
    priceFrom: "4.290",
    badge: "Premium",
  },
  {
    id: "robots",
    category: "Onderhoud",
    title: "Zwembadrobots",
    description: "Automatische zwembadrobots voor moeiteloos schoon water. Onze robots reinigen bodem, wanden en waterlijn volledig autonoom.",
    image: "/images/pool-robot.jpg",
    features: [
      "Volautomatische reiniging",
      "Geschikt voor alle zwembadvormen",
      "Zuigt fijn vuil en bladeren",
      "Energiezuinig",
      "Eenvoudig te onderhouden",
    ],
    priceFrom: "899",
    badge: null,
  },
  {
    id: "chemicalien",
    category: "Waterbehandeling",
    title: "Waterbehandeling",
    description: "Complete productlijn voor perfecte waterkwaliteit. Van chloor en pH-regulatie tot anti-alg en flocculatiemiddelen.",
    image: "/images/pool-chemicals.jpg",
    features: [
      "Professionele kwaliteit",
      "Veilig voor huid en ogen",
      "Eenvoudig te doseren",
      "Langdurige werking",
      "Advies op maat",
    ],
    priceFrom: "29",
    badge: null,
  },
]

export const defaults: Product[] = [
  ...catalogProducts.map(({ image, priceFrom, ...product }) => ({
    ...product,
    images: [{ src: image, alt: product.title, width: 1200, height: 900 }],
    price: priceFrom,
    specifications: [],
  })),
  {
    id: "neptune-v2",
    category: "Jacuzzi",
    title: "Neptune V2",
    description: "",
    images: [
      { src: "/images/neptune-soir.jpeg", alt: "Neptune V2 jacuzzi bij avond", width: 4800, height: 3584 },
      { src: "/images/Neptune-jacuzzi-market-spas (1).png", alt: "Neptune V2 jacuzzi productafbeelding", width: 7680, height: 7680 },
    ],
    features: [],
    specifications: [
      { label: "Capaciteit", value: "2 ligplaatsen + 3 zitplaatsen" },
      { label: "Afmetingen", value: "220 × 220 × 82 cm" },
      { label: "Massagejets", value: "88" },
      { label: "Massagepompen", value: "3 × 2 pk" },
      { label: "Verwarming", value: "3 kW" },
      { label: "Stroomaansluiting", value: "32 A" },
      { label: "Waterbehandeling", value: "UV-C" },
      { label: "Bediening", value: "Balboa TP600" },
      { label: "Muziek", value: "Ingebouwde Bluetooth" },
    ],
    price: "9.999",
    badge: null,
  },
]

export const jacuzziId = "neptune-v2"
