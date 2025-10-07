import { toast } from "react-toastify";
export const trackPromiseWithToast = async (promise, messages) => {
  const toastId = toast.loading(messages.pending, {
    autoClose: false,
    closeButton: false,
  });
  try {
    const result = await promise;
    toast.update(toastId, {
      render: messages.success,
      type: "success",
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
    });
    return result;
  } catch (error) {
    const errorMessage =
      typeof messages.error === "function"
        ? messages.error(error)
        : messages.error;
    toast.update(toastId, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 8000,
      closeButton: true,
    });
    throw error;
  }
};
