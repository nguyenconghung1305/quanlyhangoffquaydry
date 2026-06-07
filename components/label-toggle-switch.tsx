"use client";

import { useOptimistic, useTransition } from "react";
import type { ActionResult } from "@/app/actions/products";
import { cn } from "@/lib/utils";
import { Check, Package, Tag } from "lucide-react";

export type LabelToggleKind = "off30" | "zeroWaste" | "expired";

const CONFIG: Record<
  LabelToggleKind,
  {
    labeledText: string;
    unlabeledText: string;
    labeledAria: string;
    unlabeledAria: string;
    done: string;
    pending: string;
    pendingBorder: string;
  }
> = {
  off30: {
    labeledText: "Đã dán lại 30%",
    unlabeledText: "Chưa dán — gạt khi xong",
    labeledAria: "Đã dán lại nhãn 30%",
    unlabeledAria: "Chưa dán lại nhãn 30% — cần làm",
    done: "border-green-500 bg-green-500 text-white shadow-md",
    pending: "border-orange-400 bg-orange-100 text-orange-950 shadow-sm",
    pendingBorder: "ring-orange-400",
  },
  zeroWaste: {
    labeledText: "Đã dán",
    unlabeledText: "Chưa dán — gạt khi xong",
    labeledAria: "Đã dán nhãn zero waste",
    unlabeledAria: "Chưa dán nhãn zero waste — cần làm",
    done: "border-green-500 bg-green-500 text-white shadow-md",
    pending: "border-red-400 bg-red-100 text-red-950 shadow-sm",
    pendingBorder: "ring-red-400",
  },
  expired: {
    labeledText: "Đã gom",
    unlabeledText: "Chưa gom — gạt khi xong",
    labeledAria: "Đã gom hàng hết hạn",
    unlabeledAria: "Chưa gom hàng hết hạn — cần làm",
    done: "border-green-500 bg-green-500 text-white shadow-md",
    pending: "border-zinc-400 bg-zinc-200 text-zinc-900 shadow-sm",
    pendingBorder: "ring-zinc-400",
  },
};

type LabelToggleSwitchProps = {
  productId: string;
  labeled: boolean;
  kind: LabelToggleKind;
  onToggle: (id: string, labeled: boolean) => Promise<ActionResult>;
};

export function LabelToggleSwitch({
  productId,
  labeled: initialLabeled,
  kind,
  onToggle,
}: LabelToggleSwitchProps) {
  const cfg = CONFIG[kind];
  const [pending, startTransition] = useTransition();
  const [labeled, setLabeled] = useOptimistic(
    initialLabeled,
    (_current, next: boolean) => next
  );

  function handleToggle() {
    const next = !labeled;
    startTransition(async () => {
      setLabeled(next);
      await onToggle(productId, next);
    });
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={labeled}
      aria-label={labeled ? cfg.labeledAria : cfg.unlabeledAria}
      disabled={pending}
      onClick={handleToggle}
      className={cn(
        "relative flex h-12 w-full items-center rounded-full border-2 px-1 transition-all duration-200",
        labeled ? cfg.done : cfg.pending,
        pending && "opacity-70"
      )}
    >
      <span
        className={cn(
          "absolute top-1 flex size-9 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200",
          labeled ? "right-1" : "left-1"
        )}
      >
        {labeled ? (
          <Check className="size-5 text-green-600" />
        ) : kind === "expired" ? (
          <Package className="size-5 text-zinc-600" />
        ) : (
          <Tag className="size-5 text-current opacity-70" />
        )}
      </span>
      <span
        className={cn(
          "w-full text-center text-sm font-bold sm:text-base",
          labeled ? "pr-10 pl-3" : "pr-3 pl-10"
        )}
      >
        {labeled ? cfg.labeledText : cfg.unlabeledText}
      </span>
    </button>
  );
}

export function getPendingRingClass(kind: LabelToggleKind): string {
  return CONFIG[kind].pendingBorder;
}
