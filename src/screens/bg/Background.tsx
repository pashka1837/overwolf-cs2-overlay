import { useEffect } from "react";
import { useGameEvents, useWindow } from "../../lib/hooks";
import { CS2_CLASS_ID, WINDOW_NAMES } from "../../shared/constants";
import {
  checkIfGameRun,
  closeWindow,
  obtainWindow,
  restoreWindow,
} from "../../lib/overwolf";

export function Background() {
  const { isWinActive } = useWindow(WINDOW_NAMES.INGAME);
  const { start, stop } = useGameEvents();

  async function runProcess() {
    if (!isWinActive) return;
    const isGameRuning = await checkIfGameRun(CS2_CLASS_ID);
    if (!isGameRuning) {
      await closeWindow(WINDOW_NAMES.INGAME);
      return;
    }
    await start();
    return;
  }

  async function gameTriggerFn(e: overwolf.games.GameInfoUpdatedEvent) {
    if (!e.runningChanged || e.gameInfo?.classId !== CS2_CLASS_ID) return;
    if (!e.gameInfo.isRunning) {
      await closeWindow(WINDOW_NAMES.INGAME);
      return;
    }

    if (e.gameInfo.isRunning && !isWinActive) {
      await restoreWindow(WINDOW_NAMES.INGAME);
      return;
    }
  }

  async function launcherTriggerFn() {
    if (!isWinActive) {
      const winState = await obtainWindow(WINDOW_NAMES.INGAME);
      if (!winState) return;
    }
    await restoreWindow(WINDOW_NAMES.INGAME);
    return;
  }

  // async function launcherTriggerFn() {
  //   if (!isWinActive) {
  //     const winState = await obtainWindow(WINDOW_NAMES.INGAME);
  //     if (winState) await restoreWindow(WINDOW_NAMES.INGAME);
  //     return;
  //   }
  //   await restoreWindow(WINDOW_NAMES.INGAME);
  //   return;
  // }

  useEffect(() => {
    runProcess();
    overwolf.games.onGameInfoUpdated.addListener(gameTriggerFn);
    overwolf.extensions.onAppLaunchTriggered.addListener(launcherTriggerFn);
    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(gameTriggerFn);
      overwolf.extensions.onAppLaunchTriggered.removeListener(
        launcherTriggerFn
      );
      stop();
    };
  }, [isWinActive]);
  return <div>Background</div>;
}
