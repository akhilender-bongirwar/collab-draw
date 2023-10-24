const COLORS: Record<string,string> = {
    BLACK: 'black',
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    ORANGE: 'orange',
    YELLOW: 'yellow',
    WHITE: 'white'
}

const NAV_ITEMS: Record<string,string> = {
    PENCIL: 'PENCIL',
    ERASER: 'ERASER',
    UNDO: 'UNDO',
    REDO: 'REDO',
    DOWNLOAD: 'DOWNLOAD'
}

export {COLORS, NAV_ITEMS};
export type NAV_ITEM_KEYS = keyof typeof NAV_ITEMS;
export type COLOR_KEYS = keyof typeof COLORS;