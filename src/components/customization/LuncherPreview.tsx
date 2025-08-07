import { useState } from "react";
import { TabButton } from "../global/TabButton";
import { hsbaToHex } from "src/utils";
import desktopPanel from "src/assets/images/desktop-panel.svg";
import mobilePanel from "src/assets/images/mobile-panel.svg";
import buttonIcon from "src/assets/images/button-icon-sample.svg";
import close from "src/assets/images/close.svg";

export default function LuncherPreview({ form, previewTab }: any) {
  return (
    <div>
      <div
        className={`relative flex items-end ${
          previewTab === "web"
            ? "w-full aspect-[1] md:aspect-[1.37]"
            : "w-[318px] mx-auto aspect-[0.65]"
        }`}
      >
        <img
          src={previewTab === "web" ? desktopPanel : mobilePanel}
          className={`block absolute h-full object-cover ${
            previewTab === "web" ? "w-full" : "w-[318px]"
          }`}
          alt="bg"
        />
        <div
          className={`z-10 relative w-full ${
            previewTab === "web" ? "mb-28 lg:mb-60" : "mb-28 lg:mb-40"
          }`}
        >
          {form.buttonStyle === "inline" && (
            <div
              className="absolute right-0 bottom-0 h-16 w-16 rounded-s-lg flex items-center justify-center"
              style={{ backgroundColor: hsbaToHex(form.buttonColor) }}
            >
              <img
                src={form.floatingAvatar || buttonIcon}
                alt="icon"
                className="max-h-full aspect-square"
              />
            </div>
          )}
          {form.buttonStyle === "floating" && (
            <div
              className={`absolute -bottom-20 h-16  px-2 text-white text-base  font-semibold rounded-xl flex items-center justify-center gap-2 right-4`}
              style={{ backgroundColor: hsbaToHex(form.buttonColor) }}
            >
              {form.buttonType !== "label" && (
                <span className="h-12">
                  <img
                    src={form.floatingAvatar || buttonIcon}
                    alt="icon"
                    className="max-h-full aspect-square"
                  />
                </span>
              )}
              {form.buttonType !== "icon" && <span>{form.floatingLabel}</span>}
            </div>
          )}
          <div
            className={`bg-white border border-solid rounded-2xl p-4 flex flex-col gap-2 ml-auto ${
              previewTab === "web" ? "max-w-[350px] " : "max-w-[250px]"
            } ${
              form.buttonStyle === "inline" ? "mr-20" : "mr-4 !max-w-[300px]"
            }`}
            style={{ borderColor: hsbaToHex(form.buttonColor) }}
          >
            <img src={close} alt="icon" width={20} className="ml-auto" />
            <div className="w-1/2 bg-[#F8F9FA] rounded-lg h-[42px]"></div>
            <div className="w-full bg-[#F8F9FA] rounded-lg h-[42px]"></div>
            <div
              className="h-10 rounded-full flex items-center justify-center font-semibold text-white text-base"
              style={{ backgroundColor: hsbaToHex(form.buttonColor) }}
            >
              {form.buttonLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
