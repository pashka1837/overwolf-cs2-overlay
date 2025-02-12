import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

type OwInfo = overwolf.games.events.InfoUpdates2Event & {
  info: any;
};
type OwEvent = overwolf.games.events.NewGameEvents;

type InfoPayload = PayloadAction<OwInfo>;
type EventPayload = PayloadAction<OwEvent>;
type IsListenGame = PayloadAction<boolean>;

interface GamedState {
  events: Array<OwEvent>;
  infos: Array<OwInfo>;
  isListenGame: boolean;
}

const initialState: GamedState = {
  events: [],
  infos: [],
  isListenGame: false,
};

const backgroundSlice = createSlice({
  name: "gameStore",
  initialState,
  reducers: {
    setInitial(state) {
      state.events = [];
      state.infos = [];
    },
    setEvent(state, action: EventPayload) {
      state.events.push(action.payload);
    },
    setInfo(state, action: InfoPayload) {
      state.infos.push(action.payload);
    },
    setListenGame(state, action: IsListenGame) {
      state.isListenGame = action.payload;
    },
  },
});

declare global {
  interface Window {
    reduxStore: typeof reduxStore;
  }
}

const reduxStore = configureStore({
  reducer: backgroundSlice.reducer,
});

window.reduxStore = reduxStore;

export const { reduxStore: store } = overwolf.windows.getMainWindow();

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const { setEvent, setInfo, setInitial, setListenGame } =
  backgroundSlice.actions;
