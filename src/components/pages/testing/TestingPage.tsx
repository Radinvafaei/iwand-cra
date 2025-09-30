import { type FC, useState, useCallback, useEffect } from "react";
import {
  Button,
  Card,
  Modal,
  Text,
  BlockStack,
  InlineStack,
  Divider,
} from "@shopify/polaris";
import { CongratsIcon } from "../../../icons";
import { useShowPlansManager } from "../../../providers/ShopifyProvider";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { createApp } from "@shopify/app-bridge";
import TestWaitMessage from "src/components/TestWaitMessage";
import appEmbed from "src/assets/images/appEmbed.svg";
import arrow from "src/assets/images/testing-arrow.svg";
import testingInspireMe from "src/assets/images/testing-inspire-me.svg";
import testingPairUp from "src/assets/images/testing-pairup.svg";
import testingFindIt from "src/assets/images/testing-findit.svg";
import testingSnap from "src/assets/images/testing-snap.svg";
import testingSuitCheck from "src/assets/images/testing-suit-check.svg";
import testingStyleIdea from "src/assets/images/testing-style-idea.svg";
import testingFindSimilar from "src/assets/images/testing-find-silimar.svg";
import { useGetEmbedEnabled, useGetEmbedUrl } from "src/service/hooks";
import useGetShopName from "src/hooks/useGetShopName";
import { EmbedEnabledResponse } from "src/service/interface";
import httpClient from "src/service/client";

declare global {
  interface Window {
    startBot: ({
      token,
      env,
      shop,
    }: {
      token: string;
      env: "shop" | "test";
      shop: string;
    }) => void;
  }
}

const ReviewSource = ({
  icon,
  title,
  modalTitle,
  modalDescription,
}: {
  icon: React.ReactNode;
  title: string;
  modalTitle: string;
  modalDescription: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  return (
    <>
      <div
        className="group flex justify-between items-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-2 group-hover:translate-x-1 duration-300 p-1">
          {icon}
          <span>{title}</span>
        </div>
        <img src={arrow} alt="Arrow" />
      </div>
      <Modal open={isModalOpen} onClose={handleModalClose} title={modalTitle}>
        <Modal.Section>
          <p className="!mb-4">{modalDescription}</p>
          <Divider />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleModalClose} variant="primary">
              Got it
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default function TestingPage() {
  const shopName = useGetShopName();

  const { active_tabs, app } = useShowPlansManager();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const { data: embedUrl, isFetching: embedUrlLoading } = useGetEmbedUrl(
    shopName!
  );

  const { data: embedEnabled, isFetched: embedEnabledLoading } =
    useGetEmbedEnabled(shopName!);

  useEffect(() => {
    if (app) {
      setLoading(true);
      const fetchToken = async () => {
        const sessionToken = await getSessionToken(createApp(app));
        const response = await httpClient.request({
          method: "POST",
          url: "/auth/admin-token",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
          },
        });
        setLoading(false);
        const { token } = await response.data;
        setToken(token);
      };

      fetchToken();
    }
  }, [app]);

  useEffect(() => {
    if (token && shopName)
      setTimeout(
        () => window.startBot?.({ token, env: "test", shop: shopName }),
        2000
      );
  }, [token, shopName]);

  if (!active_tabs.includes("Testing")) {
    return <TestWaitMessage />;
  }

  return loading ? (
    <div className="inset-0 z-10 absolute flex items-center justify-center">
      Loading...
    </div>
  ) : (
    <div className="bg-white poppins p-6 flex flex-col md:min-h-[780px]">
      <div>
        <h1 className="!text-[24px] !font-medium !mb-4">Test AI assistant</h1>
        <Card>
          <div className="flex justify-between md:items-center flex-col md:!flex-row gap-2">
            <div className="flex gap-2 items-center">
              <img src={appEmbed} alt="App Embed" />
              <h2 className="!font-medium !m-0 !text-base poppins">
                iWAND’s app embed
              </h2>
              {embedEnabledLoading &&
                (embedEnabled?.data.enabled === true ? (
                  <span className="bg-[#24C99D] rounded-full text-white text-xs h-5 px-2 pt-[2px]">
                    On
                  </span>
                ) : (
                  <span className="bg-[#F9F9FC] rounded-full text-[#797981] text-xs h-5 px-2 pt-[2px]">
                    Off
                  </span>
                ))}
            </div>
            {embedUrlLoading === false && (
              <a
                className="border border-solid border-[#272A34] rounded-lg bg-white px-4 h-8 flex items-center justify-center w-fit text-xs font-medium"
                href={embedUrl?.data.redirect_url}
                target="_top"
              >
                Enable to display stylist
              </a>
            )}
          </div>
        </Card>
      </div>
      <div className="flex-1 !mt-4 grid grid-cols-1 gap-4 [@media(min-width:960px)]:grid-cols-[calc(100vw_-_476px)_400px] md:h-[calc(100vh_-_164px)]">
        <div
          className="rounded-0 [@media(min-width:490px)]:!rounded-[12px] md:h-[calc(100vh_-_164px)] min-h-[600px]"
          style={{
            border: "1px solid #ddd",
          }}
        >
          <div className="!static h-full" id="bot-container"></div>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <h3 className="!font-medium !text-base">Review Source</h3>
            <p className="!text-xs !mt-1">Main-page Agents</p>
            <div className="mt-3 flex flex-col">
              <ReviewSource
                icon={<img src={testingInspireMe} alt="Inspire Me" />}
                title="Inspire Me"
                modalTitle="Inspire Me Agent"
                modalDescription="For shoppers who don't know what to wear — asks about appearance and preferences, then recommends perfect items and full outfits."
              />
              <ReviewSource
                icon={<img src={testingPairUp} alt="Pair Up" />}
                title="Pair Up"
                modalTitle="Pair Up Agent"
                modalDescription="Shoppers describe or upload items from their wardrobe; the agent suggests matching pieces from your store."
              />
              <ReviewSource
                icon={<img src={testingFindIt} alt="Find It" />}
                title="Find It"
                modalTitle="Find It Agent"
                modalDescription="For shoppers who know what they want — they describe the item in detail and the agent finds the best matches in your catalogue."
              />
              <ReviewSource
                icon={<img src={testingSnap} alt="Snap & Match" />}
                title="Snap & Match"
                modalTitle="Snap & Match Agent"
                modalDescription="Users upload a photo; the AI identifies the fashion pieces in the image and recommends similar or matching products available in your store."
              />
              <p className="!text-xs !mt-3">Product-page Agents</p>
              <div className="mt-3 flex flex-col">
                <ReviewSource
                  icon={<img src={testingSuitCheck} alt="Suit Check" />}
                  title="Suit Check"
                  modalTitle="Suit Check Agent"
                  modalDescription="Suit Check: Helps shoppers decide whether to purchase by addressing their concerns about style, appearance, or personal preferences."
                />
                <ReviewSource
                  icon={<img src={testingStyleIdea} alt="Style Idea" />}
                  title="Style Idea"
                  modalTitle="Style Idea Agent"
                  modalDescription="Boosts average order value by recommending complementary outfits and add-ons tailored to the product and the customer’s preferences."
                />
                <ReviewSource
                  icon={<img src={testingFindSimilar} alt="Find Similar" />}
                  title="Find Similar"
                  modalTitle="Find Similar Agent"
                  modalDescription="Helps customers find the exact item they have in mind by allowing them to modify similar products."
                />
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="!font-medium !text-base">Share your feedback</h3>
            <p className="!text-[#4A4949] !text-xs !mt-2">
              We value your insights! Share your experience to help us make your
              AI stylist even better.
            </p>
            <a
              className="border border-solid border-[#272A34] rounded-lg bg-white px-4 h-8 flex items-center justify-center w-fit mt-4 text-xs font-medium"
              href="https://wa.me/491789166826"
              target="_blank"
              rel="noreferrer"
            >
              Message us on WhatsApp
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
