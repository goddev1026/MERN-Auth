export const formatMessage = (msg: string) => {
  return (
    msg.charAt(0).toUpperCase() +
    msg.slice(1) +
    (msg[msg.length - 1] === "." ? "" : ".")
  );
};
