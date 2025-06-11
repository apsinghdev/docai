"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import React from "react"
import { cn } from "@/lib/utils"

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & { children?: React.ReactNode }
>((props, ref) => {
  const { className, ...rest } = props as any;
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      className={cn("", className)}
      {...rest}
    />
  );
}) as any

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & { children?: React.ReactNode }
>((props, ref) => {
  const { className, ...rest } = props as any;
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn("", className)}
      {...rest}
    />
  );
}) as any

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> & { children?: React.ReactNode }
>((props, ref) => {
  const { className, ...rest } = props as any;
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={cn("", className)}
      {...rest}
    />
  );
}) as any

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
