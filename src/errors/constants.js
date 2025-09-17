export const NO_FOUND = (error) => ({
  title: "Not Found",
  code: "NO_FOUND",
  status: 404,
  detail: "The ID you are searching for may be invalid",
  errors: (Array.isArray(error) ? error : [error])
});

export const FAILED_CREATE_NOTE = (error) => ({
  title: "Failed to create a note",
  code: "FAILED_CREATE_NOTE",
  status: 400,
  detail: "Prossibly an internal error occurred",
  errors: (Array.isArray(error) ? error : [error])
});
