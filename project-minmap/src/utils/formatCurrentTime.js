import { format } from "date-fns";

export const formatCurrentTime = () => {
  const currentTime = new Date();
  return format(currentTime, "dd/MM/yyyy HH:mm:ss");
};
