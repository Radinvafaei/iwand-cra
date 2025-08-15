"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Layout,
  InlineStack,
  BlockStack,
  Button,
  Box,
  Page,
} from "@shopify/polaris";
import { DonutChart } from "src/components/donut-chart";
import SupportButton from "src/components/support-button/SupportButton";
import { AiStyleCard } from "src/components/cards/ai-style-card";
import { BaseCard } from "src/components/cards/base-card";
import useGetShopName from "src/hooks/useGetShopName";
import {
  useCheckPublishStatus,
  useConversationUsage,
  useGetProductsProcessed,
  usePublish,
} from "src/service/hooks";
import { useToast } from "@shopify/app-bridge-react";
import { useShowPlansManager } from "src/providers/ShopifyProvider";
import useShopifyRedirect from "src/hooks/useShopifyRedirect";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const shopName = useGetShopName();
  const conversationUsage = useConversationUsage(shopName!);
  const productsProcessed = useGetProductsProcessed(shopName!);
  const toast = useToast();
  const { active_tabs_refetch } = useShowPlansManager();
  const push = useNavigate();
  const { mutateAsync, data } = usePublish({
    shop: shopName!,
    is_published: true,
  });

  const { data: isPublished } = useCheckPublishStatus(shopName!);

  const [isPublishedState, setIsPublishedState] = useState(false);

  useEffect(() => {
    if (isPublished?.data.is_published) {
      setIsPublishedState(true);
    }
  }, [isPublished]);

  useEffect(() => {
    if (productsProcessed?.data?.data?.all_products_processed) {
      active_tabs_refetch();
    }
  }, [productsProcessed?.data?.data?.all_products_processed]);

  const navigate = useShopifyRedirect();

  const handleLaunch = async () => {
    try {
      const { data } = await mutateAsync();
      if (data.is_published) {
        await active_tabs_refetch();
        setIsPublishedState(true);
        toast.show("The app has been published");
      }
    } catch (e) {
      toast.show(`an error occurred: ${JSON.stringify(e)}`, { isError: true });
    }
  };
  const onNavigate = (pathname: string) => {
    navigate(pathname);
    push(pathname);
  };
  return (
    <>
      <div
        style={{
          background: "#2C294B",
          padding: "2rem 3rem",
          color: "white",
        }}
      >
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="200">
            <Text as="h1" variant="heading2xl" tone="inherit">
              Dashboard
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Welcome Back!
            </Text>
          </BlockStack>
          <InlineStack gap="100">
            <Text as="p" variant="bodySm" tone="inherit">
              Do you have any question?
            </Text>
            <Button variant="primary" size="large">
              Lets Talk
            </Button>
          </InlineStack>
        </InlineStack>
      </div>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <Card>
              <Box padding="600">
                <BlockStack gap="400">
                  <Text as="h2" variant="headingLg">
                    {productsProcessed.data?.data?.all_products_processed
                      ? "Your AI Stylist is ready"
                      : "Your AI Stylist is under launch"}
                  </Text>
                  <InlineStack gap="400" align="start">
                    <AiStyleCard
                      title="AI Stylist"
                      status={
                        productsProcessed.data?.data?.all_products_processed
                          ? "completed"
                          : "in-progress"
                      }
                      buttonText="Test it"
                      progressMessage="in progress"
                      subtitle="Product information is gathering"
                      onButtonClick={() => onNavigate("/testing")}
                      isPublished={isPublishedState}
                    />
                    <BaseCard
                      completed={
                        productsProcessed.data?.data?.all_products_processed
                      }
                      title="Customization"
                      completedMessage="completed!"
                      buttonText="Check it"
                      onButtonClick={() => onNavigate("/customization")}
                    />
                    <BaseCard
                      completed={
                        data?.data?.is_published
                          ? !data?.data?.is_published
                          : productsProcessed.data?.data?.all_products_processed
                      }
                      title="Widget state"
                      completedMessage="completed!"
                      buttonText="Launch"
                      onButtonClick={handleLaunch}
                      isPublished={isPublishedState}
                    />
                  </InlineStack>
                </BlockStack>
              </Box>
            </Card>
            {/*<Box paddingBlockStart="600">
                <InsightsComponent shop={shopName || ''} />
              </Box>*/}
            <Box paddingBlockStart="600">
              <Layout>
                {/*<Layout.Section variant="oneHalf">
                    <AgentsUsageChart
                        data={chartData}
                        agents={chartAgents}
                        onDateRangeChange={handleDateRangeChange}
                        onAgentFilterChange={handleAgentFilterChange}
                    />
                  </Layout.Section>*/}
                <Layout.Section variant="oneThird">
                  {conversationUsage?.data?.data && (
                    <DonutChart {...conversationUsage?.data?.data} />
                  )}
                </Layout.Section>
              </Layout>
            </Box>

            <Box paddingBlockStart="600">
              <SupportButton />
            </Box>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default DashboardPage;
