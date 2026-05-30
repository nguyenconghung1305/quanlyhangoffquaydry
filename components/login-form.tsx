"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <Card className="w-full max-w-md border-2 shadow-xl">
      <CardHeader className="gap-2 text-center">
        <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <Package className="size-8" />
        </div>
        <CardTitle className="text-3xl">Quản lý hàng off</CardTitle>
        <CardDescription className="text-lg">
          Đăng nhập để tiếp tục
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          {state?.error && (
            <Alert variant="destructive" className="text-base">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
