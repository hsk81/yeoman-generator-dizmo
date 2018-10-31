import * as I18next from 'i18next';

import { named } from './sys/util/named';
import { trace } from './sys/util/trace';

export type TranslationFunction = I18next.TranslationFunction;
export type TranslationOptions = I18next.TranslationOptions;

declare const i18n: ((
    callback: (error: any, t: TranslationFunction) => void
) => void);

@trace
@named('I18N')
export class I18N {
    public static init(
        callback: (t: TranslationFunction) => void
    ): void {
        i18n((error: any, t: TranslationFunction): void => {
            if (typeof callback === 'function') {
                callback((
                    key: string, options: TranslationOptions = {}
                ): string => {
                    if (options.keySeparator === undefined) {
                        options.keySeparator = '/';
                    }
                    return t(key, options);
                });
            }
        });
    }
}

export default I18N;
