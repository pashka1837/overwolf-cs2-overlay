import { useEffect, useState } from "react";
import { getCurrentWindow } from "../lib/overwolf";
import "@overwolf/overwolf-api-ts";
import { Background } from "../screens/bg/Background";
import { WINDOW_NAMES } from "../shared/constants";
import { Ingame } from "../screens/ingame/Ingame";

function App() {
  const [curScreen, setCurScreen] = useState("none");
  useEffect(() => {
    async function onLoad() {
      const screenName = await getCurrentWindow();
      setCurScreen(screenName);
    }
    onLoad();
  }, []);

  if (curScreen === "none") return null;

  switch (curScreen) {
    case WINDOW_NAMES.BACKGROUND:
      return <Background />;
    case WINDOW_NAMES.INGAME:
      return <Ingame />;
    default:
      return null;
  }
}

export default App;
