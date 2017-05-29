import {TranslationFunction} from './sys/type/window';
import {TranslationOptions} from './sys/type/window';
import {i18n} from './sys/type/window';

import {named} from './sys/util/named';
import {trace} from './sys/util/trace';

@trace
@named('I18N')
export class I18N {
    public constructor(callback:(T:TranslationFunction) => void) {
        i18n((err:any, t:TranslationFunction):void => {
            let T:TranslationFunction = this.translate(
                (key:string, options:TranslationOptions = {}):string => {
                    if (options.keySeparator === undefined) {
                        options.keySeparator = '/';
                    }
                    return t(key, options);
                }
            );
            if (typeof callback === 'function') {
                callback(T);
            }
        });
    }
    private translate(T:TranslationFunction):TranslationFunction {
        let cell = document.getElementsByClassName('table-cell')[0];
        cell.textContent = T('greeting');
        let done = document.getElementById('done');
        done.textContent = T('done');
        return T;
    }
}

export {TranslationFunction};
export {TranslationOptions};

export default I18N;
