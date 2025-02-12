import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

export function Loader() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
