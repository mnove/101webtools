import * as React from "react";
import { calculateSize } from "./utils";

interface ScalePreviewProps {
  fontFamily: string;
  baseSize: number;
  scaleRatio: number;
  sampleText: string;
}

export function ScalePreview({
  fontFamily,
  baseSize,
  scaleRatio,
  sampleText,
}: ScalePreviewProps) {
  return (
    <div className="col-span-1 md:col-span-5 bg-muted/50 max-h-[1000px] border-l">
      <div className="border-b p-2">
        <h3 className="text-sm font-medium uppercase font-mono text-muted-foreground">
          Type Scale Preview
        </h3>
      </div>
      <div className=" shadow-sm p-6 h-full whitespace-nowrap overflow-y-hidden relative ">
        <div className="space-y-4" style={{ fontFamily }}>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              h1 ({calculateSize(baseSize, scaleRatio, 5)}px)
            </div>
            <div
              style={{
                fontSize: `${calculateSize(baseSize, scaleRatio, 5)}px`,
                fontWeight: 800,
              }}
              className="whitespace-nowrap"
            >
              {sampleText}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              h2 ({calculateSize(baseSize, scaleRatio, 4)}px)
            </div>
            <div
              style={{
                fontSize: `${calculateSize(baseSize, scaleRatio, 4)}px`,
                fontWeight: 700,
              }}
            >
              {sampleText}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              h3 ({calculateSize(baseSize, scaleRatio, 3)}px)
            </div>
            <div
              style={{
                fontSize: `${calculateSize(baseSize, scaleRatio, 3)}px`,
                fontWeight: 700,
              }}
            >
              {sampleText}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              h4 ({calculateSize(baseSize, scaleRatio, 2)}px)
            </div>
            <div
              style={{
                fontSize: `${calculateSize(baseSize, scaleRatio, 2)}px`,
                fontWeight: 600,
              }}
            >
              {sampleText}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              h5 ({calculateSize(baseSize, scaleRatio, 1)}px)
            </div>
            <div
              style={{
                fontSize: `${calculateSize(baseSize, scaleRatio, 1)}px`,
                fontWeight: 600,
              }}
            >
              {sampleText}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              paragraph ({baseSize}px)
            </div>
            <p style={{ fontSize: `${baseSize}px` }}>{sampleText}</p>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              small ({calculateSize(baseSize, scaleRatio, -2)}px)
            </div>
            <small
              style={{
                fontSize: `${calculateSize(baseSize, scaleRatio, -2)}px`,
              }}
            >
              {sampleText}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
