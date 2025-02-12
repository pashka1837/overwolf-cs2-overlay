import { Sheet, Stack, Typography } from "@mui/joy";

type KdaProps = {
  kda: KdaType;
};

export function Kda({ kda }: KdaProps) {
  return (
    <Sheet variant="outlined" color="primary">
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        {Object.entries(kda).map(([label, value]) => {
          return (
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <Typography fontWeight={700} fontSize={"lg"}>
                {label.toUpperCase()}:
              </Typography>
              <Typography fontSize={"lg"}>{value}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Sheet>
  );
}
