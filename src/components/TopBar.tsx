import {
  Box,
  Stack,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Button,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStore } from "../Store/UseStore";
import type { SortDir } from "../Store/UseStore";
import type { SelectChangeEvent } from "@mui/material";
export default function TopBar({
  onOpenCart,
  categories,
}: {
  onOpenCart: () => void;
  categories: string[];
}) {
  const search = useStore((s: any) => s.search) as string;
  const setSearch = useStore((s: any) => s.setSearch) as (v: string) => void;

  const category = useStore((s: any) => s.category) as string;
  const setCategory = useStore((s: any) => s.setCategory) as (
    v: string
  ) => void;

  const priceSort = useStore((s: any) => s.priceSort) as SortDir | null;
  const setPriceSort = useStore((s: any) => s.setPriceSort) as (
    v: SortDir | null
  ) => void;

  const toggleSort = () => {
    const next: SortDir | null =
      priceSort === null ? "asc" : priceSort === "asc" ? "desc" : null;
    setPriceSort(next);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setCategory(e.target.value as string);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", sm: "center" }}
      sx={{ mb: 2 }}
    >
      {/* Search Box */}
      <TextField
        label="Search"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />

      {/* Category Dropdown */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="cat-label">
          <FilterAltIcon sx={{ mr: 1 }} />
          Category
        </InputLabel>
        <Select
          labelId="cat-label"
          label="Category"
          value={category}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort Button */}
      <Tooltip
        title={priceSort ? `Price: ${priceSort.toUpperCase()}` : "Price: none"}
      >
        <IconButton onClick={toggleSort} aria-label="sort by price">
          <SortIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ flex: 1 }} />

      {/* Cart Button */}
      <Button
        variant="outlined"
        startIcon={<ShoppingCartIcon />}
        onClick={onOpenCart}
      >
        Cart
      </Button>
    </Stack>
  );
}
