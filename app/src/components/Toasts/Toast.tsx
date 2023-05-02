import clsx from "clsx"

const variants = {
  success: "bg-primary-20 text-primary-300",
  error: "bg-error-20 text-error-300",
  alert: "bg-alert-20 text-natural-300"
}

const durations = {
  default: 3000,
  short: 1000,
  long: 5000
}

export interface ToastProps {
  toast: {
    id: string
    variant?: keyof typeof variants
    title: string
    message?: string
    duration?: keyof typeof durations
  }
  onDismiss: (id: string) => void
}

export const Toast = ({
  toast: { id, variant = "success", title, message, duration = "default" },
  onDismiss
}: ToastProps): JSX.Element => {
  setTimeout(() => {
    onDismiss(id)
  }, durations[duration])

  return (
    <div
      className={clsx(
        "inline-block drop-shadow-elevation2 px-6 py-4 text-default flex items-center",
        variants[variant]
      )}
      role="alert"
    >
      <div className="flex-1">
        {title}
        <span className="block mt-1 text-small text-natural-300">
          {message}
        </span>
      </div>
      <button
        type="button"
        className="ml-4 text-natural-90  hover:bg-white rounded-lg p-1.5 inline-flex h-8 w-8 flex-2"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => {
          onDismiss(id)
        }}
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  )
}
