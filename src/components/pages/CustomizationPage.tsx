import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  RadioButton,
  Collapsible,
  TextField,
  DropZone,
  ColorPicker,
  Button,
} from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import { TabButton } from "../global/TabButton";
import { Luncher } from "../customization/Luncher";
import MainPage from "../customization/MainPage";
import ProductPage from "../customization/ProductPage";
import LuncherPreview from "../customization/LuncherPreview";
import MainPageWebPreview from "../customization/MainPageWebPreview";
import MainPageMobilePreview from "../customization/MainPageMobilePreview";
import ProductPageWebPreview from "../customization/ProductPageWebPreview";
import ProductPageMobilePreview from "../customization/ProductPageMobilePreview";
import {
  useGetCustomization,
  useUpdateCustomization,
} from "src/service/customizationServices/customization.service";
import AIWait from "../AIWait/AIWait";
import { useShowPlansManager } from "../../providers/ShopifyProvider";

export default function CustomizationPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [previewTab, setPreviewTab] = useState("web");
  const [mainPageSelectedTab, setMainPageSelectedTab] = useState("opening");
  const { active_tabs } = useShowPlansManager();
  const { data: customizationData, isLoading: customizationLoading } =
    useGetCustomization("wand-test-store.myshopify.com");
  useEffect(() => {
    if (customizationData?.data) {
      setForm(customizationData?.data.customization_config);
    }
  }, [customizationData]);
  const { mutate: updateCustimization, isPending: updateCustomizationLoading } =
    useUpdateCustomization("wand-test-store.myshopify.com");

  const [productPageSelectedTab, setProductPageSelectedTab] =
    useState("opening");
  const [form, setForm] = useState({
    buttonStyle: "floating",
    buttonType: "icon",
    floatingAvatar: "",
    floatingLabel: "Chat Now",
    buttonLabel: "Chat Now",
    buttonColor: {
      hue: 241,
      brightness: 0.91,
      saturation: 0.62,
      alpha: 1,
    },
    mainOpeningWelcome: "Try the new AI-Powered Fashion Assistant",
    mainButtonLabel: "Get Started",
    mainButtonColor: {
      hue: 241,
      brightness: 0.91,
      saturation: 0.62,
      alpha: 1,
    },
    mainIntroWelcome: "What can I help you with this item?",
    productOpeningWelcome:
      "Get personalized assistance on size, preferences, similars and styling ",
    productButtonLabel: "Get Started",
    productButtonColor: {
      hue: 241,
      brightness: 0.91,
      saturation: 0.62,
      alpha: 1,
    },
    productIntroWelcome: "What can I help you with this item?",
  });

  const updateCustimizationHandle = async () => {
    try {
      await updateCustimization({ ...form });
    } catch (error) {
      console.error("Error updating customization:", error);
    }
  };

  if (!active_tabs?.includes("Customization")) {
    return <AIWait />;
  }

  return customizationLoading ? (
    <div className="inset-0 z-10 absolute flex items-center justify-center">
      Loading...
    </div>
  ) : (
    <Page fullWidth>
      {/* <TitleBar title="Customization" /> */}
      <div className="p-2 mb-6 border-b border-solid border-transparent border-b-gray-200 flex gap-4">
        <TabButton
          caption="Launcher"
          selected={selectedTab === 0}
          onClick={() => setSelectedTab(0)}
        />
        <TabButton
          caption="Main Page"
          selected={selectedTab === 1}
          onClick={() => setSelectedTab(1)}
        />
        <TabButton
          caption="Product Page"
          selected={selectedTab === 2}
          onClick={() => setSelectedTab(2)}
        />
      </div>
      <Layout>
        <Layout.Section variant="oneThird">
          <Card>
            {selectedTab === 0 && <Luncher form={form} setForm={setForm} />}
            {selectedTab === 1 && (
              <MainPage
                form={form}
                setForm={setForm}
                selectedTab={mainPageSelectedTab}
                setSelectedTab={setMainPageSelectedTab}
              />
            )}
            {selectedTab === 2 && (
              <ProductPage
                form={form}
                setForm={setForm}
                selectedTab={productPageSelectedTab}
                setSelectedTab={setProductPageSelectedTab}
              />
            )}
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <div className="p-2 mb-6 border-b border-solid border-transparent border-b-gray-200 flex gap-4">
              <TabButton
                caption="Web"
                selected={previewTab === "web"}
                onClick={() => setPreviewTab("web")}
              />
              <TabButton
                caption="Mobile"
                selected={previewTab === "mobile"}
                onClick={() => setPreviewTab("mobile")}
              />
            </div>
            {selectedTab === 0 && (
              <LuncherPreview form={form} previewTab={previewTab} />
            )}
            {selectedTab === 1 && previewTab === "web" && (
              <MainPageWebPreview form={form} mode={mainPageSelectedTab} />
            )}
            {selectedTab === 1 && previewTab === "mobile" && (
              <MainPageMobilePreview form={form} mode={mainPageSelectedTab} />
            )}
            {selectedTab === 2 && previewTab === "web" && (
              <ProductPageWebPreview
                form={form}
                mode={productPageSelectedTab}
              />
            )}
            {selectedTab === 2 && previewTab === "mobile" && (
              <ProductPageMobilePreview
                form={form}
                mode={productPageSelectedTab}
              />
            )}
            <div className="flex justify-end mt-6">
              <Button
                size="large"
                variant="primary"
                onClick={updateCustimizationHandle}
                loading={updateCustomizationLoading}
              >
                Apply Changes
              </Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
