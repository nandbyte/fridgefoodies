import logger from "pino";
import dayjs from "dayjs";

export const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `"time":"${dayjs().format()}"`,
});
