type LogLevelType = {
    label: string;
    color: string;
};

const Logger = {

    ERROR: (message: string, status: number, ...formatting: any[]): void => {
        Logging.LOG(Logging.LogLevel.ERROR, message, status, ...formatting)
    },

    INFO: (message: string, status: number, ...formatting: any[]): void => {
        Logging.LOG(Logging.LogLevel.INFO, message, status, ...formatting)
    },

    DEBUG: (message: string, status: number, ...formatting: any[]): void => {
        Logging.LOG(Logging.LogLevel.DEBUG, message, status, ...formatting)
    },

    WARNING: (message: string, status: number, ...formatting: any[]): void => {
        Logging.LOG(Logging.LogLevel.WARNING, message, status, ...formatting)
    },

}

class Logging {

    private static stringInterpolation(input: string, formatting: any[]): string {
        const _r = (p: string, c: any): string => p.replace(/%s/, c);
        return formatting.reduce(_r, input);
    }

    private static parseCode(code: number): string {
        if (!code) return "";
        let good = code === 200 || code === 304;
        let message: string;

        if (code <= 399) message = "OK";
        else if (code <= 499) {
            if (code === 429) {
                message = "Too Many Requests";
            } else {
                message = "Client Error";
            }
        } else message = "Server Error";

        return `${good ? this.LogLevel.INFO["color"] : this.LogLevel.ERROR["color"]} ${code} ${message}`;
    }

    static LOG(logLevel: LogLevelType, message: string, code: number, ...formatting: any[]): void {
        console.log(
            `[${new Date().toISOString()}] ${logLevel["color"]}${logLevel["label"]}${this.stringInterpolation(message, formatting)}${this.parseCode(code)}\x1b[0m`,
        );
    }

    static LogLevel: Record<string, LogLevelType> = {
        INFO: {
            "label": "INFO\x1b[0m:    ",
            "color": "\x1b[32m"
        },
        ERROR: {
            "label": "ERROR\x1b[0m:     ",
            "color": "\x1b[31m"
        },
        DEBUG: {
            "label": "DEBUG\x1b[0m:     ",
            "color": "\x1b[32m"
        },
        WARNING: {
            "label": "WARN\x1b[0m:    ",
            "color": "\x1b[33m"
        }
    }
}

export = Logger;
