"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

/** Accordion-based FAQ entry with animated expand/collapse. */
export interface FAQItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  /** The question text shown in the trigger */
  question: string;
  /** The answer text revealed on expand */
  answer: string;
}

const FAQItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  FAQItemProps
>(({ className, question, answer, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "border-b border-border-subtle/30 overflow-hidden",
        className
      )}
      {...props}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between py-6 md:py-8 text-left cursor-pointer [&[data-state=open]>div]:bg-primary [&[data-state=open]>div]:border-primary [&[data-state=open]>div]:text-primary-foreground [&[data-state=open]>div>svg]:rotate-45 [&[data-state=open]>span]:text-primary">
          <span className="text-lg md:text-xl font-bold font-display uppercase tracking-tight text-foreground transition-colors duration-300">
            {question}
          </span>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-medium transition-all duration-300 text-muted-foreground ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-luxury"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content className="overflow-hidden text-base text-text-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <p className="pb-8 leading-relaxed max-w-3xl">{answer}</p>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
});
FAQItem.displayName = "FAQItem";

export { FAQItem };
