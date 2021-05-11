import React, { useEffect } from "react";
import WebcamNew from "./WebcamNew";

const App = () => {
  return <WebcamNew frameRate={30} width={1920} height={1080} />;
};

export default App;
