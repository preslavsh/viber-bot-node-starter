export const BEGIN = 'begin';
export const SHARE = 'share';

export const notRandomPatterns = [
    BEGIN,
    SHARE,
];

export const getRandomPattern = (): RegExp => {
    let patternsStr = notRandomPatterns.join('|');
    return new RegExp(`^((?!(${patternsStr})).)*$`,'i');
};
