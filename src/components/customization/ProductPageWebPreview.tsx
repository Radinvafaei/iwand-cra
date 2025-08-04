import { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Rect,
  Group,
} from "react-konva";
import useImage from "use-image";
import { hsbaToHex } from "src/utils";

export default function ProductPageWebPreview({ form, mode }: any) {
  const [image] = useImage("/images/desktop-bot-temp.svg");
  const [bgImage] = useImage("/images/desktop-panel.svg");
  const [flaotingButtonImage] = useImage("/images/button-icon-sample.svg");

  const options = {
    textX: 440,
    textY: 100,
    fontSize: 18,
    textColor: "black",
    canvasWidth: 1200,
    canvasHeight: 900,
  };

  const WIDTH = 400;

  const [textHeight, setTextHeight] = useState(50);
  const [textWidth, setTextWidth] = useState(50);

  const textRef = useRef<any>(null);
  const hiddenTextRef = useRef<any>(null); // to determine text width

  useEffect(() => {
    if (hiddenTextRef.current) {
      if (hiddenTextRef.current.width() < 80) {
        setTextWidth(100);
      }
      if (hiddenTextRef.current.width() > WIDTH - 80) {
        setTextWidth(WIDTH - 80);
      } else {
        setTextWidth(hiddenTextRef.current.width() + 20);
      }
    }
  }, [form, mode]);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.height());
    }
  }, [form, textWidth]);

  return mode === "intro" ? (
    <>
      <Stage
        width={options.canvasWidth}
        height={options.canvasHeight}
        style={{
          width: "100%",
        }}
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              width={options.canvasWidth}
              height={options.canvasHeight}
            />
          )}
          <Text
            text={form.productIntroWelcome}
            x={660}
            y={120}
            fontSize={20}
            fontVariant="Bold"
            fill="#333"
            fontFamily="Arial"
            width={500}
            lineHeight={1.4}
          />
        </Layer>
      </Stage>
      <style>
        {`
         .konvajs-content{
          overflow:hidden;
          position:relative;
          min-height: 450px
        }
        canvas, .konvajs-content{
          width: 100%!important;
          height: auto!important;
          aspect-ratio: 1.33
        }
          canvas{
          min-width: 600px;
          position:absolute;
          right:0;
          left: auto!important;
          top:0
          
          }
        `}
      </style>
    </>
  ) : (
    <>
      <Stage
        width={options.canvasWidth}
        height={options.canvasHeight}
        style={{
          width: "100%",
        }}
      >
        <Layer>
          {bgImage && (
            <KonvaImage
              image={bgImage}
              width={options.canvasWidth}
              height={options.canvasHeight}
            />
          )}

          <Group x={options.canvasWidth - 80} y={550}>
            <Rect
              width={80}
              height={80}
              fill={hsbaToHex(form.productButtonColor)} // Rectangle fill color
              cornerRadius={[12, 0, 0, 12]} // Rounded corners
            />
            {flaotingButtonImage && (
              <KonvaImage
                image={flaotingButtonImage}
                width={40}
                height={40}
                x={20}
                y={20}
              />
            )}
          </Group>
          <Group x={options.canvasWidth - WIDTH - 100} y={400 - textHeight}>
            <Rect
              width={WIDTH}
              height={textHeight + 230}
              fill="#fff" // Rectangle fill color
              cornerRadius={20} // Rounded corners
              stroke={hsbaToHex(form.productButtonColor)} // Border color
              strokeWidth={1} // Border thickness
            />
            <Group x={20} y={40}>
              <Rect
                x={0}
                y={0}
                width={260}
                height={60}
                fill="#F8F9FA" // Rectangle fill color
                cornerRadius={12} // Rounded corners
              />
              <Text
                text="Hi There"
                x={20}
                y={20}
                fontSize={16}
                fill="#333"
                fontFamily="Arial"
                width={300}
                lineHeight={1.4}
              />
            </Group>
            <Group x={20} y={110}>
              <Rect
                x={0}
                y={0}
                width={textWidth + 40}
                height={textHeight + 40}
                fill="#F8F9FA" // Rectangle fill color
                cornerRadius={12} // Rounded corners
              />
              <Text
                ref={textRef}
                text={form.productOpeningWelcome}
                x={20}
                y={20}
                fontSize={16}
                fill="#333"
                fontFamily="Arial"
                width={textWidth}
                lineHeight={1.4}
              />
              <Text
                opacity={0}
                ref={hiddenTextRef}
                text={form.productOpeningWelcome}
                x={20}
                y={20}
                fontSize={16}
                fill="#333"
                fontFamily="Arial"
                lineHeight={1.4}
              />
            </Group>
            <Group x={20} y={160 + textHeight}>
              <Rect
                x={0}
                y={0}
                width={WIDTH - 40}
                height={50}
                fill={hsbaToHex(form.productButtonColor)} // Rectangle fill color
                cornerRadius={100} // Rounded corners
              />
              <Text
                text={form.productButtonLabel}
                x={0}
                y={12}
                fontVariant="bold"
                fontSize={18}
                fill="white"
                fontFamily="Arial"
                width={WIDTH - 40}
                lineHeight={1.4}
                align="center"
              />
            </Group>
          </Group>
        </Layer>
      </Stage>
      <style>
        {`
        .konvajs-content{
          overflow:hidden;
          position:relative;
        }
        canvas, .konvajs-content{
          width: 100%!important;
          height: auto!important;
          aspect-ratio: 1.33
        }
          canvas{
          min-width: 800px;
          position:absolute;
          right:0;
          left: auto!important;
          top: auto!important;
          bottom: -100px;
          }
        `}
      </style>
    </>
  );
}
