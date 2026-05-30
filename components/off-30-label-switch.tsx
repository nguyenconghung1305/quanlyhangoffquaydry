"use client";

import { useOptimistic, useTransition } from "react";
import { setOff30Labeled } from "@/app/actions/products";
import { cn } from "@/lib/utils";
import { Check, Tag } from "lucide-react";

type Off30LabelSwitchProps = {
  productId: string;
  labeled: boolean;
};

export function Off30LabelSwitch({
  productId,
  labeled: initialLabeled,
}: Off30LabelSwitchProps) {
  const [pending, startTransition] = useTransition();
  const [labeled, setLabeled] = useOptimistic(
    initialLabeled,
    (_current, next: boolean) => next
  );

  function handleToggle() {
    const next = !labeled;
    startTransition(async () => {
      setLabeled(next);
      await setOff30Labeled(productId, next);
    });
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={labeled}
      aria-label={
        labeled ? "Đã dán lại nhãn 30%" : "Chưa dán lại nhãn 30% — cần làm"
      }
      disabled={pending}
      onClick={handleToggle}
      className={cn(
        "relative flex h-12 w-full items-center rounded-full border-2 px-1 transition-all duration-200",
        labeled
          ? "border-green-500 bg-green-500 text-white shadow-md"
          : "border-orange-400 bg-orange-100 text-orange-950 shadow-sm",
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
        ) : (
          <Tag className="size-5 text-orange-500" />
        )}
      </span>
      <span
        className={cn(
          "w-full text-center text-sm font-bold sm:text-base",
          labeled ? "pr-10 pl-3" : "pr-3 pl-10"
        )}
      >
        {labeled ? "Đã dán lại 30%" : "Chưa dán — gạt khi xong"}
      </span>
    </button>
  );
}
