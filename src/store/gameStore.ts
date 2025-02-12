import { create } from "zustand";

export type GameState = {
  kda: KdaType;
  playerState: PlayerStateType;
};

export type GameActions = {
  setKda: (kda: KdaType) => void;
  setPlayerState: (playerState: PlayerStateType) => void;
  setInitial: () => void;
};

export type GameStore = GameState & GameActions;
const initValues = {
  kda: {
    k: 0,
    d: 0,
    a: 0,
  },
  playerState: {
    newRoundKills: 0,
    newEquipValue: 0,
  },
};

export const useGameStore = create<GameStore>()((set) => ({
  ...initValues,
  setKda: (kda) => set(() => ({ kda })),
  setPlayerState: (playerState) => set(() => ({ playerState })),
  setInitial: () => set(() => ({ ...initValues })),
}));
