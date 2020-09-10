import swal from 'sweetalert';

export const Error = (text) => {
  return swal("Error", text, "error");
};

export const Warning = (text) => {
  return swal("Warning", text, "warning");
};

export const Success = (text, timer = 2000) => {
  return swal("Success", text, "success", { timer });
};

export const Info = (text) => {
  return swal("Info", text, "info");
};

export const Confirm = (text, callback) => {
  return swal({
    title: "Are you sure about the change?",
    text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
};

export const ConfirmWithInput = (text, callback) => {
  return swal({
    title: "Are you sure?",
    text,
    icon: "warning",
    buttons: true,
    dangerMode: true,
    content:"input",
  })
};
