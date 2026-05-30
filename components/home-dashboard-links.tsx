import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProductBucket } from "@/lib/buckets";
import {
  AlertTriangle,
  Ban,
  Percent,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dashboards: {
  href: string;
  title: string;
  description: string;
  bucket: ProductBucket;
  className: string;
  icon: LucideIcon;
  badgeClass: string;
}[] = [
  {
    href: "/dashboard/off-15",
    title: "Hàng off 15%",
    description: "Còn 31–45 ngày đến hạn",
    bucket: "off_15",
    className:
      "border-amber-300/80 bg-gradient-to-br from-amber-50 to-amber-100/80 shadow-md hover:shadow-lg hover:from-amber-100 hover:to-amber-200/80",
    icon: Percent,
    badgeClass: "bg-amber-200 text-amber-950 text-base px-3 py-1",
  },
  {
    href: "/dashboard/off-30",
    title: "Hàng off 30%",
    description: "Còn 5–30 ngày đến hạn",
    bucket: "off_30",
    className:
      "border-orange-300/80 bg-gradient-to-br from-orange-50 to-orange-100/80 shadow-md hover:shadow-lg hover:from-orange-100 hover:to-orange-200/80",
    icon: Sparkles,
    badgeClass: "bg-orange-200 text-orange-950 text-base px-3 py-1",
  },
  {
    href: "/dashboard/zero-waste",
    title: "Zero waste",
    description: "Còn 1–4 ngày — dán nhãn",
    bucket: "zero_waste",
    className:
      "border-red-300/80 bg-gradient-to-br from-red-50 to-red-100/80 shadow-md hover:shadow-lg hover:from-red-100 hover:to-red-200/80",
    icon: AlertTriangle,
    badgeClass: "bg-red-200 text-red-950 text-base px-3 py-1",
  },
  {
    href: "/dashboard/expired",
    title: "Đã hết hạn",
    description: "Cần xử lý ngay",
    bucket: "expired",
    className:
      "border-zinc-300 bg-gradient-to-br from-zinc-100 to-zinc-200/60 shadow-md hover:shadow-lg hover:from-zinc-200 hover:to-zinc-300/60",
    icon: Ban,
    badgeClass: "bg-zinc-300 text-zinc-900 text-base px-3 py-1",
  },
];

type HomeDashboardLinksProps = {
  counts: Record<ProductBucket, number>;
};

export function HomeDashboardLinks({ counts }: HomeDashboardLinksProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {dashboards.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className="group block">
            <Card
              className={cn(
                "h-full transition-all duration-200 group-hover:-translate-y-0.5",
                item.className
              )}
            >
              <CardHeader className="gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                      <Icon className="size-6 text-foreground/80" />
                    </span>
                    <CardTitle className="text-xl sm:text-2xl">
                      {item.title}
                    </CardTitle>
                  </div>
                  <Badge className={item.badgeClass}>
                    {counts[item.bucket]}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {item.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
