import {
  RadioButton,
  TextField,
  DropZone,
  ColorPicker,
} from "@shopify/polaris";
import { CollapsibleSection } from "./CollapsibleSection";
import { fileToDataURL } from "src/utils";
import buttonIcon from "src/assets/images/button-icon-sample.svg";

export function Luncher({ form, setForm }: any) {
  return (
    <>
      <CollapsibleSection caption="Button Style">
        <div className="flex flex-col">
          <RadioButton
            label="Floating"
            checked={form.buttonStyle === "floating"}
            name="buttonStyle"
            onChange={() => setForm({ ...form, buttonStyle: "floating" })}
          />
          <RadioButton
            label="Inline"
            checked={form.buttonStyle === "inline"}
            name="buttonStyle"
            onChange={(e) => setForm({ ...form, buttonStyle: "inline" })}
          />
        </div>
      </CollapsibleSection>

      {form.buttonStyle === "floating" && (
        <CollapsibleSection caption="Button Type">
          <div className="flex flex-col">
            <RadioButton
              label="Icon Only"
              checked={form.buttonType === "icon"}
              name="buttonType"
              onChange={() => setForm({ ...form, buttonType: "icon" })}
            />
            <RadioButton
              label="Label Only"
              checked={form.buttonType === "label"}
              name="buttonType"
              onChange={(e) => setForm({ ...form, buttonType: "label" })}
            />
            <RadioButton
              label="Icon & Label"
              checked={form.buttonType === "iconlabel"}
              name="buttonType"
              onChange={(e) => setForm({ ...form, buttonType: "iconlabel" })}
            />
            {(form.buttonType === "label" ||
              form.buttonType === "iconlabel") && (
              <div className="mt-4">
                <TextField
                  autoComplete="off"
                  type="text"
                  label="Label Text"
                  value={form.floatingLabel}
                  onChange={(e) => setForm({ ...form, floatingLabel: e })}
                />
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}
      {form.buttonStyle === "inline" ||
      (form.buttonStyle === "floating" &&
        (form.buttonType === "icon" || form.buttonType === "iconlabel")) ? (
        <CollapsibleSection caption="Avatar">
          <div className="w-[138px]">
            <DropZone
              allowMultiple={false}
              onDropAccepted={async (e) => {
                const file = e?.[0];

                const dataUrl = await fileToDataURL(file);
                setForm({ ...form, floatingAvatar: dataUrl });
              }}
            >
              <div className="bg-[#DEE2E6] rounded-sm flex items-center justify-center p-2 px-4 w-fit mx-auto mt-8">
                <img
                  src={form.floatingAvatar || buttonIcon}
                  alt="icon"
                  width={34}
                />
              </div>
              <button className="text-[#5C59E8] text-xs font-medium bg-transparent border-none outline-none mt-4 mb-6 block mx-auto">
                Replace
              </button>
            </DropZone>
          </div>
        </CollapsibleSection>
      ) : null}
      <CollapsibleSection caption="Button Settings">
        <TextField
          autoComplete="off"
          size="slim"
          type="text"
          label="Button Label"
          value={form.buttonLabel}
          onChange={(e) => setForm({ ...form, buttonLabel: e })}
          helpText="Only in openning can see this title"
        />
        <div className="Polaris-Text--root Polaris-Text--bodyMd !mt-4">
          Button Color
        </div>
        <ColorPicker
          onChange={(color) => setForm({ ...form, buttonColor: { ...color } })}
          color={form.buttonColor}
          allowAlpha
        />
      </CollapsibleSection>
    </>
  );
}
