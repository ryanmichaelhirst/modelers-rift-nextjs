import { createLogger, format, transports, config } from 'winston'

const { combine, timestamp, json } = format

const APPLICATION_NAME = 'MODELERS-RIFT'

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${process.env.DATADOG_API_KEY}&ddsource=nodejs&service=${APPLICATION_NAME}`,
  ssl: true,
}

// new transports.Console(),
export const stripeLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'stripe-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),
  transports: [new transports.Http(httpTransportOptions)],
  // automatically log all uncaught exceptions to the console
  exceptionHandlers: [new transports.Console()],
  exitOnError: false,
})

export const patreonLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'patreon-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),
  transports: [new transports.Http(httpTransportOptions)],
  // automatically log all uncaught exceptions to the console
  exceptionHandlers: [new transports.Console()],
  exitOnError: false,
})

export const awsLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'aws-service' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),
  transports: [new transports.Http(httpTransportOptions)],
  // automatically log all uncaught exceptions to the console
  exceptionHandlers: [new transports.Console()],
  exitOnError: false,
})
