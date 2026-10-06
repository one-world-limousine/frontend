"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, type ThemeConfig } from "antd";
import type { ReactNode } from "react";

// antd theme mapped to the One World design tokens.
// Seed tokens need real colours (antd derives shades from them); globals.css then points antd's
// global colour variables at the design tokens, so light and dark switch in CSS with no re-render.
// Component tokens below are passed straight through as CSS, so they reference the tokens directly.
const surface = "var(--surface-raised)";
const focus = "0 0 0 1px var(--bronze-strong)";
const field = {
  activeBg: surface,
  hoverBg: surface,
  activeBorderColor: "var(--bronze-strong)",
  hoverBorderColor: "var(--ink-muted)",
  activeShadow: focus,
  addonBg: "var(--surface-alt)",
  paddingInline: 16,
};

const theme: ThemeConfig = {
  cssVar: { key: "ow" },
  hashed: false,
  token: {
    colorPrimary: "#8c5e2f", // bronze-strong
    colorText: "#2b2d31", // ink
    colorTextSecondary: "#5f636a", // ink-muted
    colorTextPlaceholder: "#5f636a",
    colorTextDescription: "#5f636a",
    colorBorder: "#8a8f96", // line-strong
    colorBorderSecondary: "#e4e0da", // line
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f6f4f1",
    colorError: "#a8322a",
    colorSuccess: "#2e6a50",
    colorLink: "#8c5e2f",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    borderRadius: 14, // radius-md
    borderRadiusSM: 8,
    borderRadiusLG: 20,
    controlHeight: 52, // control-height
    controlHeightSM: 38,
    motionDurationMid: "0.18s",
  },
  components: {
    Input: field,
    InputNumber: field,
    DatePicker: {
      ...field,
      cellHoverBg: "var(--ow-hover)",
      cellActiveWithRangeBg: "var(--bronze-tint)",
      cellHoverWithRangeBg: "var(--bronze-tint)",
      cellRangeBorderColor: "var(--bronze)",
      cellBgDisabled: "var(--surface-alt)",
    },
    Select: {
      selectorBg: surface,
      activeBorderColor: "var(--bronze-strong)",
      hoverBorderColor: "var(--ink-muted)",
      activeOutlineColor: "var(--ow-outline)",
      optionActiveBg: "var(--ow-hover)",
      optionSelectedBg: "var(--bronze-tint)",
      optionSelectedColor: "var(--ink)",
      optionSelectedFontWeight: 600,
    },
    Form: { labelColor: "var(--ink-muted)", verticalLabelPadding: "0 0 6px", itemMarginBottom: 20 },
  },
};

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme} wave={{ disabled: true }}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
