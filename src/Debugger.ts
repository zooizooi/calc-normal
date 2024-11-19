import { FolderApi, Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';
import { KeyboardHandler } from '@zooizooi/utils';
import { KEY_DOWN, KeyDirection } from '@zooizooi/utils/modules/KeyboardHandler';

const pane = new Pane();
pane.registerPlugin(EssentialsPlugin);

new KeyboardHandler({
    keymap: {
        '`': (direction: KeyDirection) => {
            if (direction === KEY_DOWN) {
                pane.hidden = !pane.hidden;
            }
        },
    },
});

export type DebuggerFolder = FolderApi;
export default pane.addFolder({ title: 'Normals', expanded: false });