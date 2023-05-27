import { nanoid } from "nanoid"
import { create } from "zustand"

export interface Toast {
  id: string
  variant: "success" | "error" | "alert"
  title: string
  message?: string
}

interface ToastsStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  dismissToast: (id: string) => void
}

export const useToastStore = create<ToastsStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => ({
      toasts: [...state.toasts, { id: nanoid(), ...toast }]
    }))
  },
  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
  }
}))
