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

type D = Date | number | string | null | undefined;

const formatDate = (value: D, formatter = "YYYY-MM-DD HH:mm:ss") => {
  const emptySymbol = "---";
  if (value === null) return emptySymbol;

  return date.formatDate(value, formatter) || emptySymbol;
};

export { logger, formatDate };
