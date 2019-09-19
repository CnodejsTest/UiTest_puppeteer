import { Logger, configure, getLogger } from 'log4js'


const logconfig = {
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'debug' } }
}

export class Log {
    private static Logger: Logger

    public static init() {
        configure(logconfig);
        Log.Logger = getLogger('puppeteer')
    }


    public static debug(debug: string) {
        Log.Logger.debug(debug)
    }

    public static info(info: string) {
        Log.Logger.info(info)
    }

    public static warn(warn: string) {
        Log.Logger.warn(warn)
    }

    public static error(error: string) {
        Log.Logger.error(error)
    }
}


Log.init()