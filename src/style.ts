import { color } from './colors';
import { markdown, mdOptionsList } from './md';
import {colors} from './model';
function isMarkdownOptions(options: {font?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', background?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', effects?: ("bright" | "dim" | "italic" | "underscore" | "blink")[], bold?: boolean, italic?: boolean, mono?: boolean, link?: string, blockquote?: boolean}): boolean {
    return mdOptionsList.some(key => key in options);
}
function styleImpl(text: string, options: {font?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', background?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', effects?: ("bright" | "dim" | "italic" | "underscore" | "blink")[], bold?: boolean, italic?: boolean, mono?: boolean, link?: string, blockquote?: boolean}): string {
    if (text.length === 0) {
        return text;
    }
    if ('font' in options || 'background' in options || 'effects' in options) {
        return color(text, options);
    }
    if (isMarkdownOptions(options)) {
        return markdown(text, options);
    }
    return text;
}
const colorsObj = new Map(colors.map(color => [color, (text: string) => console.log(style(text, { font: color }))]));
export const style = Object.assign(styleImpl, {
    log: (text: string, options: {font?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', background?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', effects?: ("bright" | "dim" | "italic" | "underscore" | "blink")[], bold?: boolean, italic?: boolean, mono?: boolean, link?: string, blockquote?: boolean}) => {
        console.log(style(text, options));
    },
    color: (x: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow') => {
        const log = colorsObj.get(x);
        return log || console.log;
    },
});
