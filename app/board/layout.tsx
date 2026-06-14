import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS 对接大厅 · 找员工 找客户 找供应商 找合作",
  description:
    "澳洲 NDIS 行业的需求墙：招聘 Support Worker、找客户转介、找供应商、找合伙人、买卖生意。免费发布你的需求，圈子帮你对接。",
  alternates: { canonical: "/board" },
};

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
