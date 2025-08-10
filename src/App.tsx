import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "src/components/pages/dashboard";
import AgentConfigPage from "src/components/pages/agent-config";
import ConversationPage from "src/components/pages/conversation";
import TestingPage from "src/components/pages/testing";
import Providers from "src/providers/Providers";
import CustomizationPage from "src/components/pages/CustomizationPage";
import Plans from "src/components/pages/Plans/Plans";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/config" element={<AgentConfigPage />} />
        <Route path="/conversation" element={<ConversationPage />} />
        <Route path="/test" element={<TestingPage />} />
        <Route path="/customization" element={<CustomizationPage />} />
        <Route path="/plans" element={<Plans />} />
      </Routes>
    </Providers>
  );
}

export default App;
