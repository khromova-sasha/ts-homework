import {backgroundColors, effects, fontColors, Reset} from './model';
function addColor(text: string, color: keyof typeof backgroundColors, isBackground = false): string {
    if (isBackground) {
        return text + backgroundColors[color];
    }
    return text + fontColors[color];
}
function getEffects(effectList: (keyof typeof effects)[]): string {
    return effectList.map(effect => effects[effect]).join('');
}
export function color(text: string, options?: {font?: keyof typeof fontColors, background?: keyof typeof backgroundColors, effects?: (keyof typeof effects)[], bold?: boolean, italic?: boolean, mono?: boolean, link?: string, blockquote?: boolean}): string {
    const preparedText = text.replace(/ё/g, 'е');
    let result = '';
    if (options) {
        if (options.font) {
            result = addColor(result, options.font);
        }
        if (options.background) {
            result = addColor(result, options.background, true);
        }
        if (options.effects) {
            result += getEffects(options.effects);
        }
        result += preparedText;
        result += Reset;
        return result;
    }
    return preparedText;
}
