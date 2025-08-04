'use client';

import {type FC, useState, type FormEvent } from 'react';
import type {MobileBrowserProps} from './interface';
import { Button, Icon } from '@shopify/polaris';
import { MicrophoneIcon, PlusIcon, XIcon } from '@shopify/polaris-icons';

const MobileBrowser: FC<MobileBrowserProps> = ({
  defaultSrc = 'about:blank',
}) => {
  const [iframeSrc, setIframeSrc] = useState(defaultSrc);
  const [searchValue, setSearchValue] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const url = searchValue.startsWith('http')
        ? searchValue
        : `https://${searchValue}`;
      setIframeSrc(url);
      setSearchValue('');
    }
  };

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <div
      style={{
        width: '343px',
        height: '721px',
        border: '1px solid #757575',
        borderRadius: '60px',
        position: 'relative',
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '15px',
          left: '30px',
          right: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white',
          fontSize: '16px',
        }}
      >
        <span style={{ color: 'black' }}>9:41</span>
      </div>

      <iframe
        src={iframeSrc}
        style={{
          width: '100%',
          height: 'calc(100% - 60px)',
          border: 'none',
          position: 'absolute',
          top: '40px',
          left: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '10px 20px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form
          onSubmit={handleSearchSubmit}
          style={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Your fashion shop"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '24px',
              border: 'none',
              backgroundColor: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              fontSize: '16px',
            }}
          />
          <span style={{ marginLeft: '10px', fontSize: '20px' }}>
            <Icon source={MicrophoneIcon} tone="primary" />
          </span>
        </form>
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: 'black',
            marginTop: '8px',
            borderRadius: '2px',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          zIndex: 10,
        }}
      >
        <Button
          variant="monochromePlain"
          onClick={openChat}
          icon={PlusIcon}
          accessibilityLabel="Add theme"
        />
      </div>

      {isChatOpen && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: 0,
            right: 0,
            bottom: '60px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            zIndex: 20,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '20px',
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

          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: '#f0f0f0',
              }}
            >
              Women
            </button>
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                background: '#f0f0f0',
              }}
            >
              Man
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Hi there!</h1>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              What can I help you with?
            </h1>
          </div>

          {/* cards */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div
              style={{
                width: '100px',
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
                width: '100px',
                padding: '16px',
                background: '#f9f9f9',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>Pair Up</p>
              <p style={{ fontSize: '12px' }}>
                Upload, describe, or weigh them
              </p>
            </div>
            <div
              style={{
                width: '100px',
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
              width: '100%',
              padding: '12px',
              borderRadius: '24px',
              border: '1px solid #ddd',
              background: '#f9f9f9',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MobileBrowser;
