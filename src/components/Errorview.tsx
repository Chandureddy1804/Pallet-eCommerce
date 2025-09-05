import { Alert, AlertTitle, Button, Stack } from "@mui/material";

export default function ErrorView({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message || "Something went wrong while fetching products."}
      </Alert>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </Stack>
  );
}
