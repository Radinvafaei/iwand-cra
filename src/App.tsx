import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import "./App.css";

import Providers from "src/providers/Providers";


function App() {
  return (
    <Providers>
      <RoutesComponent />
    </Providers>
  );
}

export default App;
