export type LabelToggleKind = "off30" | "zeroWaste" | "expired";

export const LABEL_TOGGLE_CONFIG: Record<
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

export function getPendingRingClass(kind: LabelToggleKind): string {
  return LABEL_TOGGLE_CONFIG[kind].pendingBorder;
}
