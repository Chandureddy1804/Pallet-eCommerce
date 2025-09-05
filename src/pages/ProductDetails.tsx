import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Breadcrumbs,
  Link,
  Snackbar,
} from "@mui/material";
import { useStore } from "../Store/UseStore";
import { fetchProductById } from "../Services/api";
import type { Product } from "../Services/api";
import Loader from "../components/Loader";
import ErrorView from "../components/Errorview";
import CartDrawer from "../components/Cart";
import SearchIcon from "@mui/icons-material/Search";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

// Test data is now handled in the API service

const categories = [
  { name: "Fruits & Vegetables", count: 626 },
  { name: "Fresh Vegetables", count: 339 },
  { name: "Beans, Brinjals & Okra", count: 45 },
  { name: "Cabbage & Cauliflower", count: 32 },
  { name: "Cucumber & Capsicum", count: 28 },
  { name: "Gourd, Pumpkin, Drumstick", count: 15 },
  { name: "Leafy Vegetables", count: 67 },
  { name: "Potato, Onion & Tomato", count: 89, selected: true },
  { name: "Root Vegetables", count: 23 },
  { name: "Specialty", count: 12 },
];

const brands = ["Fresho", "Fresho Potato, Onion & Tomato"];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useStore((s) => s.addToCart);
  const getTotalItems = useStore((s) => s.getTotalItems);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);

  // Fetch product from API
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProductById(id || "1");
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Using test data.");
        // The API service will automatically return test data on error
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error && !product) {
    return <ErrorView onRetry={() => window.location.reload()} />;
  }

  const prod = product || {
    id: 1,
    title: "Product Not Found",
    brand: "Fresho",
    category: "Fruits & Vegetables",
    price: 0,
    mrp: 0,
    weight: "1 kg",
    discount: 0,
    image: "",
    description: "Product details not available.",
    benefits: "Product benefits not available.",
    pricePerKg: 0,
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
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
            }}
          >
            <Typography sx={{ mr: 2 }}>Share on</Typography>
            <IconButton sx={{ color: "white", mr: 1 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "white", mr: 1 }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "white", mr: 2 }}>
              <EmailIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setCartOpen(true)}
            >
              <LocalShippingIcon sx={{ mr: 1 }} />
              <Typography>My Basket ({getTotalItems()} items)</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Breadcrumbs */}
      <Box sx={{ mt: "64px", p: 2, backgroundColor: "white" }}>
        <Breadcrumbs>
          <Link
            color="inherit"
            href="#"
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            HOME
          </Link>
          <Link
            color="inherit"
            href="#"
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            FRUITS & VEGETABLES
          </Link>
          <Link
            color="inherit"
            href="#"
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            FRESH VEGETABLES
          </Link>
          <Link
            color="inherit"
            href="#"
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            POTATO, ONION & TOMATO
          </Link>
          <Typography color="text.primary">
            {prod.title.toUpperCase()}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", mt: 2 }}>
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
                    color: cat.selected ? "#4caf50" : "inherit",
                    fontWeight: cat.selected ? "bold" : "normal",
                    cursor: "pointer",
                  }}
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
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Brands
          </Typography>
          <Stack spacing={1}>
            {brands.map((brand) => (
              <Typography
                key={brand}
                sx={{ fontSize: "0.875rem", color: "text.secondary" }}
              >
                {brand}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Main Product Area */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Product Image */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={prod.image}
                  alt={prod.title}
                  sx={{
                    width: "100%",
                    maxWidth: "400px",
                    height: "400px",
                    objectFit: "contain",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    p: 2,
                  }}
                />

                {/* Partnering with Indian Farmers Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#4caf50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    color: "white",
                    textAlign: "center",
                    lineHeight: 1.1,
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                >
                  bigbasket Partnering with Indian Farmers
                </Box>

                {/* Green Square Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#4caf50",
                    borderRadius: "2px",
                  }}
                />
              </Box>

              {/* Thumbnail */}
              <Box sx={{ mt: 2 }}>
                <Box
                  component="img"
                  src={prod.image}
                  alt={prod.title}
                  sx={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#4caf50",
                    borderRadius: "2px",
                  }}
                />
              </Box>
            </Box>

            {/* Product Details */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                {prod.brand}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                {prod.title}
              </Typography>

              {/* Pricing */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "1rem",
                  }}
                >
                  MRP: Rs {prod.mrp?.toFixed(2)}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#4caf50" }}
                >
                  Price: Rs {prod.price} (Rs.{prod.pricePerKg}/kg)
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#4caf50", fontWeight: "bold" }}
                >
                  You Save: {prod.discount}%
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  (Inclusive of all taxes)
                </Typography>
              </Box>

              {/* Quantity and Actions */}
              <Box
                sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}
              >
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  sx={{
                    width: "60px",
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                      padding: "8px",
                    },
                  }}
                  inputProps={{ min: 1, max: 10 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    addToCart(prod, quantity);
                    setSnack("Added to cart");
                  }}
                  sx={{
                    backgroundColor: "#4caf50",
                    color: "white",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#45a049",
                    },
                  }}
                >
                  ADD TO BASKET
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#4caf50",
                    color: "#4caf50",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "#45a049",
                      backgroundColor: "#f0f8f0",
                    },
                  }}
                >
                  SAVE
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate(-1)}
                  sx={{
                    borderColor: "#666",
                    color: "#666",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "#333",
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  BACK
                </Button>
              </Box>

              {/* Delivery Information */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <LocalShippingIcon sx={{ color: "#4caf50", mr: 1 }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  Standard Tomorrow 9:00AM - 1:30PM
                </Typography>
              </Box>

              {/* Share Section */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">Share on</Typography>
                <IconButton size="small" sx={{ color: "#1877f2" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "#1da1f2" }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "#666" }}>
                  <EmailIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Product Description */}
          <Paper sx={{ mt: 4, p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              {prod.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              About the Product
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 3 }}>
              {prod.description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                Benefits
              </Typography>
              <Typography sx={{ color: "#4caf50", fontSize: "1.2rem" }}>
                +
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {prod.benefits}
            </Typography>
          </Paper>
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
