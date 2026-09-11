"use client"

import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  title?: string
  description?: string
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, title, description, children, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900",
        className
      )}
      {...props}
    >
      <div className="flex-1 space-y-1">
        {title && (
          <ToastPrimitive.Title className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {title}
          </ToastPrimitive.Title>
        )}
        {description && (
          <ToastPrimitive.Description className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>
      {children}
      <ToastPrimitive.Close className="rounded-md p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
        <X className="h-4 w-4" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

export { ToastProvider, ToastViewport, Toast }
