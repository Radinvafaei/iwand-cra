import React, { useState } from "react";
import {
  Button,
  Box,
  Text,
  InlineStack,
  BlockStack,
  Card,
} from "@shopify/polaris";
import { QuestionCircleIcon } from "@shopify/polaris-icons";
import { GMailIcon, GMeetIcon, WhatsappIcon } from "src/icons";

const SupportButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/491789166826", "_blank");
    setIsExpanded(false);
  };

  const handleScheduleMeeting = () => {
    window.open("https://meet.google.com/", "_blank");
    setIsExpanded(false);
  };

  const handleSendEmail = () => {
    window.open("mailto:support@yourcompany.com", "_blank");
    setIsExpanded(false);
  };

  return (
    <Box
      position="fixed"
      insetBlockEnd="400"
      insetInlineEnd="400"
      zIndex="1000"
    >
      <BlockStack gap="200">
        {isExpanded && (
          <Card padding="050" background="bg-surface-brand-active">
            <div
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={handleWhatsAppClick}
            >
              <InlineStack gap="300" align="start" blockAlign="center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <WhatsappIcon />
                </div>
                <a href="https://wa.me/491789166826">
                  <Text as="h3" variant="headingSm" tone="base">
                    +491789166826
                  </Text>
                </a>
              </InlineStack>
            </div>

            <div
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "280px",
              }}
              onClick={handleScheduleMeeting}
            >
              <InlineStack gap="300" align="start" blockAlign="center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <GMeetIcon />
                </div>
                <BlockStack gap="050">
                  <a href="https://calendly.com/iwandstyle/shopify-support">
                    <Text as="h3" variant="headingSm" tone="base">
                      Schedule a meeting
                    </Text>
                  </a>
                </BlockStack>
              </InlineStack>
            </div>

            <div
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "280px",
              }}
              onClick={handleSendEmail}
            >
              <InlineStack gap="300" align="start" blockAlign="center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <GMailIcon />
                </div>
                <a href="mailto:iwandstyle@gmail.com">
                  <Text
                    alignment="center"
                    as="h3"
                    variant="headingSm"
                    tone="base"
                  >
                    Send an email
                  </Text>
                </a>
              </InlineStack>
            </div>
          </Card>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="primary"
            size="large"
            onClick={handleToggle}
            icon={QuestionCircleIcon}
            accessibilityLabel="Toggle support options"
          >
            Support
          </Button>
        </div>
      </BlockStack>
    </Box>
  );
};

export default SupportButton;
