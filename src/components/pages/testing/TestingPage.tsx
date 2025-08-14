"use client";

import { type FC, useState, useCallback } from "react";
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
const TestingPage: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { active_tabs } = useShowPlansManager();
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
  if (!active_tabs.includes("Testing")) {
    return <AIWait />;
  }
  return (
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
            {selectedTab === 0 && <MobileBrowser />}
            {selectedTab === 1 && <DesktopBrowser />}
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
