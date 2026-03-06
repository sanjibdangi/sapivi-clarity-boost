import { Toaster as Sonner, toast } from "sonner";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { createElement } from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={4000}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:px-5 group-[.toaster]:py-4 group-[.toaster]:backdrop-blur-sm",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-xl group-[.toast]:font-semibold group-[.toast]:px-4 group-[.toast]:py-2",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-xl",
          closeButton:
            "group-[.toast]:bg-background group-[.toast]:border-border group-[.toast]:text-muted-foreground group-[.toast]:hover:text-foreground",
          success:
            "group-[.toaster]:!bg-emerald-50 group-[.toaster]:!border-emerald-200 group-[.toaster]:!text-emerald-900",
          error:
            "group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-200 group-[.toaster]:!text-red-900",
          warning:
            "group-[.toaster]:!bg-amber-50 group-[.toaster]:!border-amber-200 group-[.toaster]:!text-amber-900",
          info: "group-[.toaster]:!bg-sky-50 group-[.toaster]:!border-sky-200 group-[.toaster]:!text-sky-900",
        },
      }}
      icons={{
        success: createElement(CheckCircle2, { size: 20, className: "text-emerald-600" }),
        error: createElement(XCircle, { size: 20, className: "text-red-600" }),
        warning: createElement(AlertTriangle, { size: 20, className: "text-amber-600" }),
        info: createElement(Info, { size: 20, className: "text-sky-600" }),
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
