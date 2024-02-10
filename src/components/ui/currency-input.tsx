import React from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

const CurrencyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="grid gap-2 relative items-center">
        <Input
          type="number"
          className={cn("pl-8 peer", className)}
          ref={ref}
          {...props}
        />
        <Label className="text-xs absolute left-2 peer-focus:text-primary text-border">
          R$
        </Label>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
