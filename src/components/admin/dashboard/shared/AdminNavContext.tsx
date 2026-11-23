"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminNavContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const AdminNavContext = createContext<AdminNavContextType | undefined>(undefined);

export function AdminNavProvider({ children }: { children: ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <AdminNavContext.Provider
      value={{
        isMobileOpen,
        setIsMobileOpen,
        toggleMobile,
        closeMobile,
      }}
    >
      {children}
    </AdminNavContext.Provider>
  );
}

export function useAdminNav() {
  const context = useContext(AdminNavContext);
  if (!context) {
    throw new Error("useAdminNav must be used within an AdminNavProvider");
  }
  return context;
}
