import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Outlet />
    </Box>
  );
}
