"use client";

import { type FC, useState, type FormEvent, useEffect } from "react";
import type { MobileBrowserProps } from "./interface";
import { Button, Icon } from "@shopify/polaris";
import { MicrophoneIcon, PlusIcon, XIcon } from "@shopify/polaris-icons";

const MobileBrowser: FC<MobileBrowserProps> = ({
  defaultSrc = "about:blank",
  token,
}) => {
  const [iframeSrc, setIframeSrc] = useState(defaultSrc);
  const [searchValue, setSearchValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const url = searchValue.startsWith("http")
        ? searchValue
        : `https://${searchValue}`;
      setIframeSrc(url);
      setSearchValue("");
    }
  };

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  useEffect(() => {
    setTimeout(() => window.startBot?.(token), 2000);
  }, []);

  return (
    <div
      style={{
        width: "390px",
        height: "844px",
        border: "3px solid #ccc",
        borderRadius: "24px",
        position: "relative",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "30px",
          right: "30px",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
          fontSize: "16px",
        }}
      >
        <span style={{ color: "black" }}>9:41</span>
      </div>
      <div id="bot-container" className="h-full"></div>
    </div>
  );
};

export default MobileBrowser;
