import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import CartDrawer from "../components/Cart";
import { useStore } from "../Store/UseStore";
import ProductCard from "../components/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../Services/api";
import type { Product } from "../Services/api";
import Loader from "../components/Loader";
import ErrorView from "../components/Errorview";

// Test data is now handled in the API service

const categories = [
  { name: "Fruits & Vegetables", count: 626, selected: true },
  { name: "Cuts & Sprouts", count: 110 },
  { name: "Exotic Fruits & Veggies", count: 125 },
  { name: "Flower Bouquets, Bunches", count: 28 },
  { name: "Fresh Fruits", count: 165 },
  { name: "Fresh Vegetables", count: 339 },
  { name: "Herbs & Seasonings", count: 57 },
  { name: "Organic Fruits & Vegetables", count: 87 },
];

// Brands are now dynamically generated from products

export default function Products() {
  const [cartOpen, setCartOpen] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(
    "Fruits & Vegetables"
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Popularity");
  const [searchTerm, setSearchTerm] = useState("");
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useStore((s) => s.addToCart);
  const getTotalItems = useStore((s) => s.getTotalItems);
  const navigate = useNavigate();

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleSort = (sortValue: string) => {
    setSortBy(sortValue);
  };

  const handleProductClick = (productId: string | number) => {
    navigate(`/product/${productId}`);
  };

  const handleBrandSearch = (searchValue: string) => {
    setBrandSearchTerm(searchValue);
  };

  // Get unique brands from products with counts
  const availableBrands = React.useMemo(() => {
    const brandCounts = products.reduce((acc, product) => {
      if (product.brand) {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(brandCounts)
      .map((brand) => ({ name: brand, count: brandCounts[brand] }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // Filter brands based on search term
  const filteredBrands = React.useMemo(() => {
    if (!brandSearchTerm) return availableBrands;
    return availableBrands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
    );
  }, [availableBrands, brandSearchTerm]);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProducts({ page: 0, pageSize: 100 });
        setProducts(response.items);
        setFilteredProducts(response.items);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Using test data.");
        // The API service will automatically return test data on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter and sort products
  React.useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.brand &&
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "Fruits & Vegetables") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Sort
    if (sortBy === "Price Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedBrands, sortBy]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorView onRetry={() => window.location.reload()} />;
  }

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            height: "4px",
            backgroundColor: "#ff6b35",
          }}
        />
        <Box
          sx={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            px: 3,
            backgroundColor: "#4caf50",
          }}
        >
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            bb
          </Typography>
          <Typography sx={{ color: "white", ml: 1, mr: 3 }}>SHOP</Typography>
          <TextField
            placeholder="Search for Products..."
            size="small"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                borderRadius: "4px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              ml: 3,
              display: "flex",
              alignItems: "center",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setCartOpen(true)}
          >
            <LocalShippingIcon sx={{ mr: 1 }} />
            <Typography>My Basket ({getTotalItems()} items)</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", width: "100%", mt: "64px" }}>
        {/* Left Sidebar */}
        <Box
          sx={{
            width: "250px",
            backgroundColor: "white",
            minHeight: "calc(100vh - 64px)",
            p: 2,
            borderRight: "1px solid #e0e0e0",
          }}
        >
          {/* Category Section */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Category
          </Typography>
          <Stack spacing={1} sx={{ mb: 3 }}>
            {categories.map((cat) => (
              <Box
                key={cat.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color:
                      selectedCategory === cat.name ? "#4caf50" : "inherit",
                    fontWeight:
                      selectedCategory === cat.name ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryChange(cat.name)}
                >
                  {cat.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({cat.count})
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Brand Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`}
            </Typography>
            {selectedBrands.length > 0 && (
              <Button
                size="small"
                onClick={() => setSelectedBrands([])}
                sx={{ fontSize: "0.75rem", minWidth: "auto", p: 0.5 }}
              >
                Clear All
              </Button>
            )}
          </Box>
          <TextField
            placeholder="Search by Brand"
            size="small"
            value={brandSearchTerm}
            onChange={(e) => handleBrandSearch(e.target.value)}
            sx={{ mb: 2, width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Stack spacing={1}>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <Box
                  key={brand.name}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => handleBrandChange(brand.name)}
                        size="small"
                      />
                    }
                    label={brand.name}
                    sx={{
                      "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    ({brand.count})
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                {brandSearchTerm
                  ? "No brands found matching your search"
                  : "No brands available"}
              </Typography>
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Seasonal Section */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Seasonal
          </Typography>
          <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            Summer Fruits
          </Typography>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Page Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {selectedCategory} (626)
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalShippingIcon sx={{ color: "#4caf50" }} />
                <Typography>ALL PRODUCTS</Typography>
              </Box>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="Popularity">Popularity</MenuItem>
                  <MenuItem value="Price Low to High">
                    Price Low to High
                  </MenuItem>
                  <MenuItem value="Price High to Low">
                    Price High to Low
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Product Grid */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(25% - 12px)",
                  },
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={(prod, quantity) => {
                    addToCart(prod, quantity);
                    setSnack("Added to cart");
                  }}
                  onProductClick={() => handleProductClick(product.id)}
                />
              </Box>
            ))}
          </Box>

          {/* Scroll to Top Button */}
          <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
            <IconButton
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                "&:hover": { backgroundColor: "#45a049" },
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack(null)}
        message={snack || ""}
      />
    </Box>
  );
}
