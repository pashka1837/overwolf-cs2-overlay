import { WINDOW_NAMES } from "../shared/constants";

export function getCurrentWindow(): Promise<string> {
  return new Promise((res, _) => {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.success) {
        return res(result.window.name);
      }
      return res("none");
    });
  });
}

export function obtainWindow(windowName: WINDOW_NAMES): Promise<string | null> {
  return new Promise((res, _) => {
    overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
      if (!result.success) res(null);
      res(result.window.stateEx);
    });
  });
}
export function restoreWindow(windowName: WINDOW_NAMES): Promise<boolean> {
  return new Promise((res, _) => {
    overwolf.windows.restore(windowName, (result) => {
      if (!result.success) res(false);
      res(true);
    });
  });
}
export function closeWindow(windowName: WINDOW_NAMES): Promise<boolean> {
  return new Promise((res, _) => {
    overwolf.windows.close(windowName, (result) => {
      if (!result.success) res(false);
      res(true);
    });
  });
}

export function gettWindowState(
  windowName: WINDOW_NAMES
): Promise<string | undefined> {
  return new Promise((res, _) => {
    overwolf.windows.getWindowState(windowName, (result) => {
      if (result.success) {
        return res(result.window_state_ex);
      }
      return res(undefined);
    });
  });
}

export function checkIfGameRun(gameId: number): Promise<boolean> {
  return new Promise((res, _) => {
    overwolf.games.getRunningGameInfo2((result) => {
      if (!result.gameInfo || !result.success) return res(false);
      if (result.gameInfo.classId === gameId) return res(true);
      return res(false);
    });
  });
}

export function setGameFeatures(features: string[]): Promise<boolean> {
  return new Promise((res, _) => {
    overwolf.games.events.setRequiredFeatures(features, (result) => {
      if (!result.success) return res(false);
      return res(true);
    });
  });
}
