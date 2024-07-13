import Swal from "sweetalert2";

export const showSweetAlert = (
  onDeleteCallback: () => void,
  title: string,
  text: string,
  confirmText: string,
  cancelText: string,
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonText: cancelText,
    confirmButtonText: confirmText,
  }).then((result: any) => {
    if (result.isConfirmed) {
      onDeleteCallback();
    }
  });
};
