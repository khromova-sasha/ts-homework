import { color } from './colors';
export const mdOptionsList: string[] = ['bold', 'italic', 'mono', 'link', 'blockquote'];
export function markdown(text: string, options: {font?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', background?: 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow', effects?: ("bright" | "dim" | "italic" | "underscore" | "blink")[], bold?: boolean, italic?: boolean, mono?: boolean, link?: string, blockquote?: boolean}): string {
    let result = text;
    if (options) {
        if (options.bold) {
            result = color(`**${result}**`, { font: "yellow", effects: ['bright'] });
        }
        if (options.italic) {
            result = color(`_${result}_`, { font: "magenta", effects: ['italic'] });
        }
        if (options.mono) {
            result = color(`\`${result}\``, { font: "green" });
        }
        if (options.link) {
            result = `[${result}](${color(options.link, { font: "blue", effects: ['underscore'] })})`;
        }
        if (options.blockquote) {
            result = color(`> ${result.replace(/\n/g, '\n> ')}`);
        }
    }
    return result;
}
