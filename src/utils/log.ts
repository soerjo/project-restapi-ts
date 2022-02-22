import logging from "pino";

const date = new Date();

const log = logging({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${date.toDateString()}"`,
});

export default log;
