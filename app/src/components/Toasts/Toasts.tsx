import { useToastStore } from "@/stores/toasts"
import { Toast } from "./Toast"

export const Toasts = (): JSX.Element => {
  const { toasts, dismissToast } = useToastStore()

  return (
    <div
      aria-live="assertive"
      className="z-50 flex flex-col fixed top-4 right-4 space-y-4 items-end px-4 py-4"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  )
}
