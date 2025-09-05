import { useMemo } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useStore } from "../Store/UseStore";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const clearCart = useStore((s) => s.clearCart);
  const addToCart = useStore((s) => s.addToCart);

  const total = useMemo(
    () =>
      cart.reduce(
        (sum: any, p: any) => sum + (p.price || 0) * (p.quantity || 1),
        0
      ),
    [cart]
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 320, sm: 380 }, p: 2 }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Cart Items */}
        <List>
          {cart.map((item) => (
            <ListItem
              key={item.id}
              sx={{ flexDirection: "column", alignItems: "stretch" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.thumbnail || item.image}
                    variant="rounded"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`₹ ${item.price} x ${item.quantity || 1}`}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Typography variant="body2">Qty:</Typography>
                <TextField
                  size="small"
                  value={item.quantity || 1}
                  onChange={(e) => {
                    const newQuantity = Math.max(1, Number(e.target.value));
                    if (newQuantity !== item.quantity) {
                      // Remove the item and add it back with new quantity
                      removeFromCart(item.id);
                      addToCart(item, newQuantity);
                    }
                  }}
                  sx={{ width: "60px" }}
                  inputProps={{ min: 1, max: 10 }}
                />
                <Typography variant="body2" sx={{ ml: "auto" }}>
                  Total: ₹{" "}
                  {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>

        {/* Empty Cart Message */}
        {cart.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Your cart is empty
          </Typography>
        )}

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Cart Footer */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Total: ₹ {total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            disabled={cart.length === 0}
            onClick={() => {
              clearCart();
              onClose();
            }}
          >
            Checkout
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
