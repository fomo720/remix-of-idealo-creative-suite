import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type QuoteItem = {
  slug: string;
  title: string;
  image?: string;
  quantity: number;
};

type QuoteContextValue = {
  items: QuoteItem[];
  count: number;
  addItem: (item: Omit<QuoteItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearAll: () => void;
  hasItem: (slug: string) => boolean;
};

const STORAGE_KEY = "idealo:quote:v1";

const QuoteContext = createContext<QuoteContextValue | null>(null);

function readStorage(): QuoteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is QuoteItem =>
        i && typeof i.slug === "string" && typeof i.title === "string" && typeof i.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem: QuoteContextValue["addItem"] = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug ? { ...p, quantity: p.quantity + (item.quantity ?? 1) } : p,
        );
      }
      return [
        ...prev,
        { slug: item.slug, title: item.title, image: item.image, quantity: item.quantity ?? 1 },
      ];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.slug === slug ? { ...p, quantity: Math.max(1, Math.floor(quantity) || 1) } : p))
        .filter((p) => p.quantity > 0),
    );
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const value = useMemo<QuoteContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearAll,
      hasItem: (slug: string) => items.some((p) => p.slug === slug),
    }),
    [items, addItem, removeItem, updateQuantity, clearAll],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
