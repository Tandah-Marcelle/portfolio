"use client";

import { useEffect } from "react";

/** Locks background page scroll while a modal/lightbox is open. */
export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked ]);
}
