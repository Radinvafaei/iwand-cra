"use client";

import { type FC, useState, useCallback, useEffect } from "react";
import {
  Page,
  Button,
  Tabs,
  Card,
  Modal,
  Text,
  BlockStack,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { MobileBrowser } from "src/components/mobile-browser";
import { DesktopBrowser } from "src/components/desktop-browser";
import SupportButton from "src/components/support-button/SupportButton";
import { CongratsIcon } from "../../../icons";
import { useShowPlansManager } from "../../../providers/ShopifyProvider";
import AIWait from "../../AIWait/AIWait";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import { createApp, type ClientApplication } from "@shopify/app-bridge";
import TestWaitMessage from "src/components/TestWaitMessage";

const TestingPage: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { active_tabs, app } = useShowPlansManager();

  const tabs = [
    {
      id: "mobile",
      content: "Mobile",
      panelID: "mobile-content",
    },
    {
      id: "desktop",
      content: "Desktop",
      panelID: "desktop-content",
    },
  ];

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    setSelectedTab(selectedTabIndex);
  }, []);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    console.log("Modal closed");
  }, []);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (app) {
      setLoading(true);
      const fetchToken = async () => {
        const sessionToken = await getSessionToken(createApp(app));
        const response = await fetch(
          "https://test-dev.iwand.style/auth/admin-token",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        const { token } = await response.json();
        setToken(token);
      };

      fetchToken();
    }
  }, [app]);

  if (!active_tabs.includes("Testing")) {
    return <TestWaitMessage />;
  }

  return loading ? (
    <div className="inset-0 z-10 absolute flex items-center justify-center">
      Loading...
    </div>
  ) : (
    <Page
      fullWidth
      title="Testing"
      primaryAction={
        <Button variant="primary" onClick={toggleModal}>
          Launch AI Stylist
        </Button>
      }
    >
      <Card>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectedTab === 0 && <MobileBrowser token={token} />}
            {selectedTab === 1 && <DesktopBrowser token={token} />}
          </div>
        </Tabs>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title="Launch Widget"
      >
        <Modal.Section>
          <BlockStack gap="400" align="center">
            <InlineStack align="center">
              <div
                style={{
                  width: "100px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <CongratsIcon />
              </div>
            </InlineStack>
            <Text as="p" variant="bodyMd" alignment="center">
              Congratulations!
            </Text>
            <Text as="h4" variant="headingSm" alignment="center">
              Your AI Stylist has launched successfully. Your customers can now
              enjoy a new and enhanced shopping experience.
            </Text>
          </BlockStack>
        </Modal.Section>
      </Modal>
      <Box paddingBlockStart="600">
        <SupportButton />
      </Box>
    </Page>
  );
};

export default TestingPage;
