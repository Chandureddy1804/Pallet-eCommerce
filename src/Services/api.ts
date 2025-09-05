import axios from "axios";

export const API_BASE =
  "https://catalog-management-system-dev-ak3ogf6zeauc.a.run.app/cms";

export const api = axios.create({
  baseURL: API_BASE,
  // NOTE: The deployed site may hit CORS; assignment says to ignore CORS errors on deploy.
  headers: { "Content-Type": "application/json" },
});

export interface Product {
  id: string | number;
  title: string;
  name?: string; // fallback if API uses name instead of title
  price: number;
  mrp?: number; // Maximum Retail Price for discount calculation
  category?: string;
  brand?: string;
  weight?: string;
  discount?: number;
  image?: string;
  thumbnail?: string;
  description?: string;
  benefits?: string;
  pricePerKg?: number;
}

// Comprehensive test data for when API fails or returns no data
export const TEST_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Onion (Loose)",
    brand: "Fresho",
    category: "Fruits & Vegetables",
    price: 156,
    mrp: 230.26,
    weight: "5 kg",
    discount: 32,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Onion.jpg/300px-Onion.jpg",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Onion.jpg/150px-Onion.jpg",
    description:
      "Fresh, crisp onions perfect for cooking. These onions are carefully selected and packed to maintain their quality and freshness. Great for all your culinary needs.",
    benefits:
      "High in antioxidants, great for cooking, freshly packed for maximum nutrition.",
    pricePerKg: 31.2,
  },
  {
    id: 2,
    title: "Fresho Potato, 2 kg",
    brand: "Fresho",
    category: "Fruits & Vegetables",
    price: 59,
    mrp: 101.45,
    weight: "2 kg",
    discount: 42,
    image:
      "https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1582515073490-39981397c445?w=150&h=150&fit=crop",
    description:
      "If you are looking for soft, slightly sweet but creamy-textured potatoes. These are a special variant early harvest of potatoes (not to be confused with our regular Fresho Potato) and are easily distinguishable with their thin/ tender skin which makes them easy-to-peel off even it can be used without peeling. These freshly picked potatoes are a great choice for roasting or boiling. They give essential nutrients to your body along with high dietary fibre and carbohydrates. Combined with great taste and nutrients this vegetable is the most popular and loved amongst households. Fresho New potatoes are either Round or Oblong which is about 45mm-65 mm in diameter. Consume them within a few days of purchase.",
    benefits:
      "High in dietary fibre and carbohydrates, great for roasting or boiling, freshly picked for maximum nutrition.",
    pricePerKg: 29.5,
  },
  {
    id: 3,
    title: "Carrot - Orange (Loose)",
    brand: "Fresho",
    category: "Fruits & Vegetables",
    price: 35,
    mrp: 67.76,
    weight: "1 kg",
    discount: 48,
    image:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=150&h=150&fit=crop",
    description:
      "Fresh, crunchy carrots rich in beta-carotene and vitamins. Perfect for salads, cooking, or snacking. These carrots are carefully selected for their sweetness and crispness.",
    benefits:
      "High in beta-carotene and vitamin A, great for eyesight, perfect for salads and cooking.",
    pricePerKg: 35,
  },
  {
    id: 5,
    title: "Banana - Robusta",
    brand: "Fresho",
    category: "Fresh Fruits",
    price: 45,
    mrp: 60,
    weight: "1 kg",
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop",
    description:
      "Fresh, sweet bananas perfect for snacking or cooking. These robusta bananas are rich in potassium and other essential nutrients.",
    benefits:
      "High in potassium, vitamin B6, and vitamin C. Great for energy and heart health.",
    pricePerKg: 45,
  },
  {
    id: 6,
    title: "Apple - Red Delicious",
    brand: "Fresho",
    category: "Fresh Fruits",
    price: 120,
    mrp: 150,
    weight: "1 kg",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=150&h=150&fit=crop",
    description:
      "Crisp, sweet red delicious apples perfect for snacking or baking. These apples are carefully selected for their quality and taste.",
    benefits:
      "High in fiber, vitamin C, and antioxidants. Great for digestion and immune system.",
    pricePerKg: 120,
  },
  {
    id: 7,
    title: "Spinach - Fresh",
    brand: "Fresho",
    category: "Leafy Vegetables",
    price: 25,
    mrp: 35,
    weight: "250 g",
    discount: 29,
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop",
    description:
      "Fresh, tender spinach leaves perfect for salads, smoothies, or cooking. Rich in iron and other essential nutrients.",
    benefits:
      "High in iron, folate, and vitamin K. Great for blood health and bone strength.",
    pricePerKg: 100,
  },
  {
    id: 8,
    title: "Capsicum - Green",
    brand: "Fresho",
    category: "Fresh Vegetables",
    price: 40,
    mrp: 55,
    weight: "500 g",
    discount: 27,
    image:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=150&h=150&fit=crop",
    description:
      "Fresh, crisp green capsicum perfect for stir-fries, salads, and stuffing. These capsicums are carefully selected for their quality.",
    benefits:
      "High in vitamin C and antioxidants. Great for immune system and skin health.",
    pricePerKg: 80,
  },
  {
    id: 10,
    title: "Broccoli - Fresh",
    brand: "Fresho",
    category: "Fresh Vegetables",
    price: 60,
    mrp: 80,
    weight: "500 g",
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=150&h=150&fit=crop",
    description:
      "Fresh, green broccoli perfect for stir-fries, soups, or steaming. Rich in vitamins and minerals.",
    benefits:
      "High in vitamin C, vitamin K, and folate. Great for bone health and immune system.",
    pricePerKg: 120,
  },
  {
    id: 11,
    title: "Orange - Navel",
    brand: "Fresho",
    category: "Fresh Fruits",
    price: 80,
    mrp: 100,
    weight: "1 kg",
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=150&h=150&fit=crop",
    description:
      "Sweet, juicy navel oranges perfect for eating fresh or making juice. These oranges are rich in vitamin C.",
    benefits:
      "High in vitamin C and fiber. Great for immune system and digestion.",
    pricePerKg: 80,
  },
  {
    id: 12,
    title: "Cucumber - English",
    brand: "Fresho",
    category: "Fresh Vegetables",
    price: 30,
    mrp: 40,
    weight: "500 g",
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=300&h=300&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=150&h=150&fit=crop",
    description:
      "Fresh, crisp English cucumbers perfect for salads and snacking. These cucumbers are seedless and have a mild taste.",
    benefits:
      "High in water content and vitamin K. Great for hydration and bone health.",
    pricePerKg: 60,
  },
];

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Fetch ALL products with pagination + normalization
 */
export async function fetchProducts(params: {
  page: number;
  pageSize: number;
}): Promise<ProductsResponse> {
  const { page, pageSize } = params;

  try {
    const res = await api.get(`/products`, { params: { page } });
    const data = res.data;

    let items: Product[] = [];
    let total = 0;

    // Handle multiple API response shapes
    if (Array.isArray(data)) {
      items = data as Product[];
      total = 1000; // fallback total for unknown APIs
    } else if (data?.items) {
      items = data.items;
      total = data.total ?? items.length;
    } else if (data?.products) {
      items = data.products;
      total = data.total ?? items.length;
    } else {
      items = data?.results || data?.data || [];
      total = data?.total || items.length;
    }

    // Normalize fields
    items = items.map((p: any, i: number) => {
      const price = Number(p.price ?? p.cost ?? p.sellingPrice ?? 0);
      const mrp = Number(
        p.mrp ?? p.maxRetailPrice ?? p.originalPrice ?? price * 1.5
      );
      const discount =
        mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

      return {
        id: p.id ?? p._id ?? p.productId ?? `${page}-${i}`,
        title:
          p.title ?? p.name ?? p.product_name ?? p.productName ?? "Untitled",
        name: p.name ?? p.title ?? p.productName,
        price: price,
        mrp: mrp,
        category:
          p.category ??
          p.category_name ??
          p.type ??
          p.categoryName ??
          "Fruits & Vegetables",
        brand: p.brand ?? p.brandName ?? "Fresho",
        weight: p.weight ?? p.quantity ?? p.unit ?? "1 kg",
        discount: discount,
        image: p.image ?? p.thumbnail ?? p.images?.[0] ?? p.imageUrl ?? "",
        thumbnail: p.thumbnail ?? p.image ?? p.images?.[0] ?? p.imageUrl ?? "",
        description: p.description ?? p.desc ?? p.productDescription ?? "",
        benefits: p.benefits ?? p.healthBenefits ?? "",
        pricePerKg:
          p.pricePerKg ??
          price / parseFloat(p.weight?.replace(/[^\d.]/g, "") || "1"),
      };
    });

    return { items, total, page, pageSize };
  } catch (error) {
    console.error("Error fetching products:", error);
    console.log("Using test data as fallback");
    return {
      items: TEST_PRODUCTS,
      total: TEST_PRODUCTS.length,
      page,
      pageSize,
    };
  }
}

/**
 * Fetch a SINGLE product by ID
 */
export async function fetchProductById(
  id: string | number
): Promise<Product | null> {
  try {
    const res = await api.get(`/products`);
    const data = res.data;

    // Extract product list based on possible API response shapes
    const list = Array.isArray(data)
      ? data
      : data?.items || data?.products || data?.data || [];

    // Find the product matching the given ID
    const raw = list.find(
      (p: any) => String(p.id ?? p._id ?? p.productId) === String(id)
    );
    if (!raw) return null;

    // Normalize fields for a single product
    const price = Number(raw.price ?? raw.cost ?? raw.sellingPrice ?? 0);
    const mrp = Number(
      raw.mrp ?? raw.maxRetailPrice ?? raw.originalPrice ?? price * 1.5
    );
    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return {
      id: raw.id ?? raw._id ?? raw.productId,
      title: raw.title ?? raw.name ?? raw.productName ?? "Untitled",
      name: raw.name ?? raw.title ?? raw.productName,
      price: price,
      mrp: mrp,
      category: raw.category ?? raw.categoryName ?? "Fruits & Vegetables",
      brand: raw.brand ?? raw.brandName ?? "Fresho",
      weight: raw.weight ?? raw.quantity ?? raw.unit ?? "1 kg",
      discount: discount,
      image:
        raw.image ?? raw.thumbnail ?? raw.images?.[0] ?? raw.imageUrl ?? "",
      thumbnail:
        raw.thumbnail ?? raw.image ?? raw.images?.[0] ?? raw.imageUrl ?? "",
      description: raw.description ?? raw.desc ?? raw.productDescription ?? "",
      benefits: raw.benefits ?? raw.healthBenefits ?? "",
      pricePerKg:
        raw.pricePerKg ??
        price / parseFloat(raw.weight?.replace(/[^\d.]/g, "") || "1"),
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    console.log("Using test data as fallback for product ID:", id);
    // Find product in test data by ID
    const testProduct = TEST_PRODUCTS.find((p) => String(p.id) === String(id));
    return testProduct || TEST_PRODUCTS[0];
  }
}
