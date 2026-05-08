import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p-001',
    name: 'OBSIDIAN TRENCH COAT',
    category: 'Outerwear',
    price: 890,
    featuredImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caeax?q=80&w=1200&auto=format&fit=crop', // A sleek dark coat vibes
    galleryImages: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550614000-4b95d466f272?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'A monument of modern tailoring. Constructed from water-repellent Italian gabardine, the Obsidian Trench features a structured fit, sharp lapels, and minimal hardware.',
    details: ['Italian wool gabardine', 'Water-repellent finish', 'Concealed button closure', 'Signature silver clasp at collar'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Jet Black'],
    isNewArrival: true,
    isLimitedEdition: true,
  },
  {
    id: 'p-002',
    name: 'AURA UTILITY CARGO',
    category: 'Bottoms',
    price: 340,
    featuredImage: 'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1550639524-a6f58345a2ca?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Elevated utility. Features an articulated knee design, six asymmetric pockets, and adjustable silver-tone buckles at the ankle for silhouette control.',
    details: ['Heavyweight cotton canvas', 'Articulated knees', 'Metallic custom hardware', 'Adjustable hem'],
    sizes: ['28', '30', '32', '34'],
    colors: ['Washed Black', 'Olive Drab'],
  },
  {
    id: 'p-003',
    name: 'VOID OVERSIZED HOODIE',
    category: 'Tops',
    price: 210,
    featuredImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'The definitive silhouette. French terry spun for exceptional weight and drape. Featuring dropped shoulders, elongated sleeves, and a sculpted hood without drawstrings for absolute purity of form.',
    details: ['100% French Terry Cotton', '700 GSM weight', 'Boxy cropped fit', 'Seamless hood'],
    sizes: ['S', 'M', 'L'],
    colors: ['Onyx', 'Bone', 'Concrete'],
    isNewArrival: true,
  },
  {
    id: 'p-004',
    name: 'ECHO LEATHER DERBY',
    category: 'Footwear',
    price: 520,
    featuredImage: 'https://images.unsplash.com/photo-1582213702172-13df93fce1fa?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1582213702172-13df93fce1fa?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'A brutalist approach to formal footwear. Built on an exaggerated lug sole with polished calfskin leather upper and a distinct square toe box.',
    details: ['Polished calf leather', 'Chunky rubber lug sole', 'Goodyear welted', 'Square toe profile'],
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Black'],
    isLimitedEdition: true,
  },
  {
    id: 'p-005',
    name: 'MONOLITH SUNGLASSES',
    category: 'Accessories',
    price: 280,
    featuredImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
       'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    ],
    description: 'Architectural eyewear. Crafted from a single block of aerospace-grade aluminum featuring pitch-black polarized lenses that sit flush with the frame.',
    details: ['Aluminum frame', 'Polarized UV400 lenses', 'Hand-finished edge details', 'Premium leather hardcase included'],
    sizes: ['O/S'],
    colors: ['Silver/Black', 'Matte Black'],
  },
  {
    id: 'p-006',
    name: 'KINETIC MESH TANK',
    category: 'Tops',
    price: 130,
    featuredImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Breathable architecture. A semi-transparent technical mesh tank top designed as a foundational layering piece or a standalone statement.',
    details: ['Technical poly-mesh blend', 'Raw cut hem', 'Tonal logo hardware on back collar'],
    sizes: ['S', 'M', 'L'],
    colors: ['Optic White', 'Asphalt'],
  }
];
