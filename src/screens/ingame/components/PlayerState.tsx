import { Sheet, Stack, Typography } from "@mui/joy";

type PlayerStateProps = {
  playerState: PlayerStateType;
};

export function PlayerState({ playerState }: PlayerStateProps) {
  return (
    <Sheet variant="outlined" color="primary">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={1}
        p={"5px"}
      >
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Typography fontSize={"md"}>Equipment Value:</Typography>
          <Typography color="success" fontWeight={700} fontSize={"lg"}>
            {playerState.newEquipValue}$
          </Typography>
        </Stack>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Typography fontSize={"md"}>Kills in Row:</Typography>
          <Typography color="danger" fontWeight={700} fontSize={"lg"}>
            {playerState.newRoundKills}
          </Typography>
        </Stack>
      </Stack>
    </Sheet>
  );
}
