import React from "react";

export function TicketSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-cream-100/60 dark:bg-[#2A241B]/60 border border-leaf-300/40 dark:border-leaf-700/30 animate-pulse flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="h-4 w-20 bg-cream-200 dark:bg-bark-600/40 rounded-full" />
        <div className="h-4 w-12 bg-cream-200 dark:bg-bark-600/40 rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-cream-200 dark:bg-bark-600/40 rounded" />
      <div className="h-3 w-1/2 bg-cream-200 dark:bg-bark-600/40 rounded" />
      <div className="h-28 w-full bg-cream-200/80 dark:bg-bark-600/30 rounded-xl" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-4 w-24 bg-cream-200 dark:bg-bark-600/40 rounded-full" />
        <div className="h-8 w-16 bg-cream-200 dark:bg-bark-600/40 rounded-full" />
      </div>
    </div>
  );
}

export function ItemSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-cream-100/60 dark:bg-[#2A241B]/60 border border-leaf-300/40 dark:border-leaf-700/30 animate-pulse flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cream-200 dark:bg-bark-600/40" />
        <div className="space-y-1.5">
          <div className="h-4 w-32 bg-cream-200 dark:bg-bark-600/40 rounded" />
          <div className="h-3 w-20 bg-cream-200 dark:bg-bark-600/40 rounded" />
        </div>
      </div>
      <div className="h-7 w-20 rounded-full bg-cream-200 dark:bg-bark-600/40" />
    </div>
  );
}
