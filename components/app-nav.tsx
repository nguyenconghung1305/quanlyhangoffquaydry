import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, Package } from "lucide-react";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/dashboard/off-15", label: "Off 15%" },
  { href: "/dashboard/off-30", label: "Off 30%" },
  { href: "/dashboard/zero-waste", label: "Zero waste" },
  { href: "/dashboard/expired", label: "Hết hạn" },
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/15 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold text-primary"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Package className="size-5" />
          </span>
          <span>Quản lý hàng off</span>
        </Link>
        <nav className="flex flex-wrap gap-1.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-base"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="size-4" />
            Đăng xuất
          </Button>
        </form>
      </div>
    </header>
  );
}
