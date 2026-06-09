"use client";

import { useEffect, useState, useTransition } from "react";
import {
  setExpiredCollected,
  setOff30Labeled,
  setZeroWasteLabeled,
} from "@/app/actions/products";
import {
  LABEL_TOGGLE_CONFIG,
  type LabelToggleKind,
} from "@/lib/label-toggle-config";
import { cn } from "@/lib/utils";
import { Check, Package, Tag } from "lucide-react";

type LabelToggleSwitchProps = {
  productId: string;
  labeled: boolean;
  kind: LabelToggleKind;
  onLabeledChange?: (labeled: boolean) => void;
};

const ACTIONS = {
  off30: setOff30Labeled,
  zeroWaste: setZeroWasteLabeled,
  expired: setExpiredCollected,
} as const;

export function LabelToggleSwitch({
  productId,
  labeled: initialLabeled,
  kind,
  onLabeledChange,
}: LabelToggleSwitchProps) {
  const cfg = LABEL_TOGGLE_CONFIG[kind];
  const onToggle = ACTIONS[kind];
  const [labeled, setLabeled] = useState(initialLabeled);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setLabeled(initialLabeled);
  }, [initialLabeled]);

  function handleToggle() {
    const next = !labeled;
    setLabeled(next);
    onLabeledChange?.(next);
    startTransition(async () => {
      const result = await onToggle(productId, next);
      if (result.error) {
        setLabeled(!next);
        onLabeledChange?.(!next);
      }
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
