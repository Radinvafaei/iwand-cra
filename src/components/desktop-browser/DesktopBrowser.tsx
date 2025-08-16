"use client";

import { type FC, useEffect, useState } from "react";
import { Button, TextField } from "@shopify/polaris";
import type { DesktopBrowserProps } from "./interface";
import { PlusIcon, RefreshIcon, XIcon } from "@shopify/polaris-icons";
declare global {
  interface Window {
    startBot: (token: string) => void;
  }
}
const DesktopBrowser: FC<DesktopBrowserProps> = ({ token }) => {
  const [inputValue, setInputValue] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      const url = value.startsWith("http") ? value : `https://${value}`;
      setIframeSrc(url);
    }
  };
  const closeChat = () => setIsChatOpen(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    setTimeout(() => window.startBot?.(token), 2000);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        height: "800px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        position: "relative",
        margin: "auto",
      }}
    >
      <div
        style={{
          height: "40px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ffbc2f",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            align="center"
            size="slim"
            label=""
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter URL"
            autoComplete="off"
            connectedRight={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => setIframeSrc(iframeSrc)}
                  icon={RefreshIcon}
                  variant="monochromePlain"
                />
              </div>
            }
          />
        </div>

        {/* {!isChatOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              right: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              zIndex: 10,
            }}
          >
            <Button
              variant="monochromePlain"
              onClick={toggleChat}
              icon={PlusIcon}
              accessibilityLabel="Add theme"
            />
          </div>
        )} */}
      </div>

      <div
        style={{ display: "flex", height: "calc(100% - 40px)" }}
        id="bot-container"
      >
        {/* <iframe
          src={iframeSrc}
          style={{
            width: isChatOpen ? '50%' : '100%',
            height: '100%',
            border: 'none',
          }}
          title="Desktop Browser"
        /> */}
        {/*  ai part*/}
        {/* {isChatOpen && (
          <div
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: '#fff',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '1px solid #ddd',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '8%',
                left: '52%',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              <Button
                variant="monochromePlain"
                onClick={closeChat}
                icon={XIcon}
                accessibilityLabel="Add theme"
              />
            </div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Hi there! What can I help you with?
            </h1>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
              <div
                style={{
                  width: '120px',
                  padding: '16px',
                  background: '#f9f9f9',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontWeight: 'bold' }}>Inspire Me</p>
                <p style={{ fontSize: '12px' }}>
                  Not sure what to get? Let me craft a style for you.
                </p>
              </div>
              <div
                style={{
                  width: '120px',
                  padding: '16px',
                  background: '#f9f9f9',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontWeight: 'bold' }}>Pair Up</p>
                <p style={{ fontSize: '12px' }}>
                  Upload or describe an item. Ill pair it up.
                </p>
              </div>
              <div
                style={{
                  width: '120px',
                  padding: '16px',
                  background: '#f9f9f9',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontWeight: 'bold' }}>Find It</p>
                <p style={{ fontSize: '12px' }}>
                  Know what you want? Describe that exact style.
                </p>
              </div>
            </div>

            <input
              type="text"
              placeholder="Ask me any style question"
              style={{
                width: '80%',
                padding: '12px',
                borderRadius: '24px',
                border: '1px solid #ddd',
                background: '#f9f9f9',
              }}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DesktopBrowser;
