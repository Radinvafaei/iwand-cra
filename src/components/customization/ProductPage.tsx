import { ColorPicker, Text, TextField } from "@shopify/polaris";
import { useState } from "react";
import { CollapsibleSection } from "./CollapsibleSection";

const TabButton = ({ caption, selected, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex-1 h-[30px] flex items-center justify-center text-[#202223] rounded-md ${
      selected ? "bg-[#E3E3E3]" : ""
    }`}
  >
    {caption}
  </button>
);

export default function ProductPage({
  form,
  setForm,
  selectedTab,
  setSelectedTab,
}: any) {
  return (
    <div>
      <div className="mb-6 border border-solid border-[#BABFC3] px-4 py-2 rounded-md flex">
        <TabButton
          caption="Opening"
          selected={selectedTab === "opening"}
          onClick={() => setSelectedTab("opening")}
        />
        <TabButton
          caption="Intro Page"
          selected={selectedTab === "intro"}
          onClick={() => setSelectedTab("intro")}
        />
      </div>

      {selectedTab === "opening" && (
        <div>
          <CollapsibleSection caption="Welcome Message">
            <TextField
              autoComplete="off"
              multiline
              type="text"
              label="Welcome Message"
              value={form.productOpeningWelcome}
              onChange={(e) => setForm({ ...form, productOpeningWelcome: e })}
            />
            <div className="flex gap-4 bg-[#EBF9FC] border border-solid border-[#98C6CD] rounded-md p-4 items-start mt-4">
              <img src="/images/information.svg" alt="icon" />
              <div>
                <Text variant="bodyMd" as="p">
                  The first message will always start with <b>"Nice choice"</b>
                  <br /> You can customize what comes after this greeting.
                </Text>
              </div>
            </div>
            <div className=" border border-solid border-transparent border-t-[#D3D3D3] pt-4 mt-3">
              <Text variant="bodyLg" as="p">
                <span className="!font-semibold">
                  This message will appear one time
                </span>
              </Text>
            </div>
          </CollapsibleSection>
          <CollapsibleSection caption="Button Settings">
            <TextField
              autoComplete="off"
              size="slim"
              type="text"
              label="Button Label"
              value={form.productButtonLabel}
              onChange={(e) => setForm({ ...form, productButtonLabel: e })}
              helpText="Only in openning can see this title"
            />
            <div className="Polaris-Text--root Polaris-Text--bodyMd !mt-4">
              Button Color
            </div>
            <ColorPicker
              onChange={(color) =>
                setForm({ ...form, productButtonColor: { ...color } })
              }
              color={form.productButtonColor}
              allowAlpha
            />
          </CollapsibleSection>
        </div>
      )}
      {selectedTab === "intro" && (
        <CollapsibleSection caption="Welcome Message">
          <TextField
            autoComplete="off"
            multiline
            type="text"
            label="Welcome Message"
            value={form.productIntroWelcome}
            onChange={(e) => setForm({ ...form, productIntroWelcome: e })}
          />
        </CollapsibleSection>
      )}
    </div>
  );
}
