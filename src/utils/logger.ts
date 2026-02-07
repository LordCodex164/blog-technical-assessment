enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.getTimestamp();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
    };
    return JSON.stringify(logEntry);
  }

  info(message: string, data?: any): void {
    const formatted = this.formatMessage(LogLevel.INFO, message, data);
    console.log(`\x1b[36m[INFO]\x1b[0m ${formatted}`);
  }

  warn(message: string, data?: any): void {
    const formatted = this.formatMessage(LogLevel.WARN, message, data);
    console.warn(`\x1b[33m[WARN]\x1b[0m ${formatted}`);
  }

  error(message: string, error?: Error | any, data?: any): void {
    const errorData = {
      ...data,
      ...(error && {
        error: {
          message: error.message,
          stack: error.stack,
          ...(error.name && { name: error.name }),
        },
      }),
    };
    const formatted = this.formatMessage(LogLevel.ERROR, message, errorData);
    console.error(`\x1b[31m[ERROR]\x1b[0m ${formatted}`);
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      const formatted = this.formatMessage(LogLevel.DEBUG, message, data);
      console.log(`\x1b[90m[DEBUG]\x1b[0m ${formatted}`);
    }
  }
}

export default new Logger();
