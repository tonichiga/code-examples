export const logger = (logname: string, error: any) => {
  if (error?.response) {
    // Request made and server responded
    console.log(logname + " :", error.response.data);
    console.log(logname + " :", error.response?.status);
    // console.log(logname + " :", error.response.headers);

    return;
  } else if (error?.request) {
    // The request was made but no response was received
    console.log(logname + " :", error.request);
    return;
  }
  if (error?.config) {
    console.log(logname + " :", error?.config);
    return;
  }

  if (error?.message) {
    console.log(logname + " :", error?.message);
    return;
  }

  console.log(logname + " :", error);
};
