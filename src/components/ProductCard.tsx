import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Select,
  MenuItem,
  Stack,
  Chip,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

interface ProductCardProps {
  product: any;
  onAddToCart: (product: any, quantity: number) => void;
  onProductClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onProductClick,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Calculate discount percentage if MRP and price available
  const discountPercent =
    product.discount ||
    (product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  return (
    <Card
      sx={{
        maxWidth: 280,
        position: "relative",
        m: 1,
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "visible",
      }}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <Chip
          label={`GET ${discountPercent}% OFF`}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            fontWeight: "bold",
            backgroundColor: "#e53e3e",
            color: "white",
            fontSize: "0.75rem",
            height: "24px",
            zIndex: 2,
          }}
        />
      )}

      {/* Product Image Container */}
      <Box
        sx={{
          position: "relative",
          p: 2,
          backgroundColor: "white",
          cursor: "pointer",
        }}
        onClick={onProductClick}
      >
        <CardMedia
          component="img"
          height="180"
          image={product.image || product.thumbnail}
          alt={product.title}
          sx={{
            objectFit: "contain",
            borderRadius: "4px",
            backgroundColor: "white",
          }}
        />

        {/* Partnering with Indian Farmers Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#4caf50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.6rem",
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          Partnering with Indian Farmers
        </Box>

        {/* Green Square Icon */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            width: "16px",
            height: "16px",
            backgroundColor: "#4caf50",
            borderRadius: "2px",
          }}
        />
      </Box>

      <CardContent sx={{ p: 2 }}>
        {/* Brand Name */}
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: "0.875rem" }}
        >
          {product.brand || "Fresho"}
        </Typography>

        {/* Product Name */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1rem" }}
        >
          {product.title}
        </Typography>

        {/* Quantity/Price Dropdown */}
        <Select
          size="small"
          value={`${product.weight} - Rs ${product.price}.00`}
          sx={{
            mb: 2,
            width: "100%",
            backgroundColor: "white",
            fontSize: "0.875rem",
          }}
        >
          <MenuItem value={`${product.weight} - Rs ${product.price}.00`}>
            {product.weight} - Rs {product.price}.00
          </MenuItem>
        </Select>

        {/* Pricing */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "line-through",
              color: "gray",
              fontSize: "0.875rem",
            }}
          >
            MRP: Rs {product.mrp?.toFixed(2) || "0.00"}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ fontSize: "1.125rem" }}
          >
            Rs {product.price?.toFixed(0) || "0"}
          </Typography>
        </Box>

        {/* Delivery Information */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <LocalShippingIcon
            sx={{ fontSize: "16px", color: "text.secondary", mr: 0.5 }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Standard Delivery: Tomorrow 9:00AM-1:30PM
          </Typography>
        </Box>

        {/* Quantity and Add Button */}
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            label="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            sx={{
              width: "60px",
              "& .MuiInputBase-input": {
                textAlign: "center",
                fontSize: "0.875rem",
              },
            }}
            inputProps={{ min: 1, max: 10 }}
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product, quantity)}
            sx={{
              backgroundColor: "#ffc107",
              color: "black",
              fontWeight: "bold",
              fontSize: "0.875rem",
              px: 2,
              "&:hover": {
                backgroundColor: "#ffb300",
              },
            }}
          >
            ADD
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
