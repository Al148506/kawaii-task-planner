import Swal from "sweetalert2";
export const showDuplicateTaskAlert = (count: number) => {
  Swal.fire({
    icon: "warning",
    title: "Tareas duplicadas",
    text: `Se omitieron ${count} tareas porque ya existían`,
  });
};
