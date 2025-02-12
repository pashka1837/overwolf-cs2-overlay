import Box from "@mui/joy/Box";
import { useAppSelector } from "../../store/eventsStore";
import { Loader } from "../../shared/components/Loader";
import { useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { Kda } from "./components/Kda";
import { PlayerState } from "./components/PlayerState";
import Stack from "@mui/joy/Stack";
import { ShowBtn } from "./components/ShowBtn";
import { ResetBtn } from "./components/ResetBtn";

export function Ingame() {
  const { infos, isListenGame } = useAppSelector((st) => st);
  const { kda, setKda, playerState, setPlayerState, setInitial } = useGameStore(
    (st) => st
  );
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    console.log("ue");
    const lateInfo = infos.at(-1);
    if (!lateInfo) return;
    if (lateInfo.feature !== "live_data") return;

    const live_data = JSON.parse(lateInfo.info.live_data.provider || {});
    if (live_data?.player?.match_stats) {
      const newKda = {
        k: live_data.player.match_stats.kills,
        d: live_data.player.match_stats.deaths,
        a: live_data.player.match_stats.assists,
      };
      if (JSON.stringify(kda) !== JSON.stringify(newKda)) setKda(newKda);
    }
    if (live_data?.player?.state) {
      const newPlayerState = {
        newRoundKills: live_data.player.state.round_kills,
        newEquipValue: live_data.player.state.equip_value,
      };
      if (JSON.stringify(playerState) !== JSON.stringify(newPlayerState))
        setPlayerState(newPlayerState);
    }
  }, [infos.length]);

  return (
    <Box
      sx={{
        display: "grid",
        gap: "20px",
        position: "relative",
      }}
    >
      {!isListenGame ? (
        <Loader />
      ) : (
        <>
          <Kda kda={kda} />
          {isShown && <PlayerState playerState={playerState} />}
          <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
            <ShowBtn isShown={isShown} setShown={setShown} />
            <ResetBtn setInitial={setInitial} />
          </Stack>
        </>
      )}
    </Box>
  );
}
