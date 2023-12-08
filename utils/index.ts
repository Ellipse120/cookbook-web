import { createConsola } from "consola/core";
import { date } from "quasar";

const logger = createConsola({
  level: 4,
  formatOptions: {
    columns: 80,
    colors: true,
    compact: false,
    date: true,
  },
});

const formatDate = (
  value: Date | number | string | undefined,
  formatter = "YYYY-MM-DD HH:mm:ss"
) => {
  return date.formatDate(value, formatter);
};

export { logger, formatDate };
