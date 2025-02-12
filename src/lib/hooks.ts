import { useEffect, useState } from "react";
import { REQUIRED_FEATURES, WINDOW_NAMES } from "../shared/constants";
import { obtainWindow, setGameFeatures } from "./overwolf";
import {
  setListenGame,
  setEvent,
  setInfo,
  setInitial,
  store,
  useAppSelector,
} from "../store/eventsStore";
import { sleep } from "./utils";

export function useWindow(windowName: WINDOW_NAMES) {
  const [isWinActive, setWinActive] = useState<boolean>(false);

  useEffect(() => {
    async function getWindow() {
      const winState = await obtainWindow(windowName);
      if (!winState) return;
      setWinActive(winState !== "closed");
    }
    getWindow();
  }, [windowName]);

  useEffect(() => {
    function winStateCb(windowE: overwolf.windows.WindowStateChangedEvent) {
      if (windowE.window_name !== windowName) return;
      switch (windowE.window_state_ex) {
        case "normal":
          if (
            windowE.window_previous_state_ex === "closed" ||
            windowE.window_previous_state_ex === "hidden"
          )
            setWinActive(true);

          break;
        case "closed":
          setWinActive(false);

          break;
        default:
          break;
      }
    }

    overwolf.windows.onStateChanged.addListener(winStateCb);
    return () => {
      overwolf.windows.onStateChanged.removeListener(winStateCb);
    };
  }, [windowName]);

  return { isWinActive };
}

export function useGameEvents() {
  const isListenGame = useAppSelector((st) => st.isListenGame);

  async function setFeatFn() {
    let isSet = false;
    let cnt = 0;

    while (!isSet && cnt < 10) {
      isSet = await setGameFeatures(REQUIRED_FEATURES);
      if (isSet) break;
      cnt++;
      await sleep(2000);
    }
    return isSet;
  }

  function dispatchSetInfo(
    e: overwolf.games.events.InfoUpdates2Event<
      string,
      overwolf.games.events.InfoUpdate2
    >
  ) {
    store.dispatch(setInfo(e));
  }

  function dispatchSetEvent(e: overwolf.games.events.NewGameEvents) {
    store.dispatch(setEvent(e));
  }

  function unRegEvents() {
    overwolf.games.events.onInfoUpdates2.removeListener(dispatchSetInfo);
    overwolf.games.events.onNewEvents.removeListener(dispatchSetEvent);
  }

  function regEvents() {
    unRegEvents();
    overwolf.games.events.onInfoUpdates2.addListener(dispatchSetInfo);
    overwolf.games.events.onNewEvents.addListener(dispatchSetEvent);
  }

  async function start() {
    if (isListenGame) return;
    if (!(await setFeatFn())) return;
    store.dispatch(setListenGame(true));
    regEvents();
  }

  function stop() {
    store.dispatch(setListenGame(false));
    store.dispatch(setInitial());
    unRegEvents();
  }

  return { start, stop };
}
