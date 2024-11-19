import { Color, Scene } from 'three';
import Debugger, { DebuggerFolder } from '@/Debugger';
import TwoPoints from '@/components/TwoPoints';

export default class WorldTwoPoints {
    public scene = new Scene();
    private debugger: DebuggerFolder;

    constructor() {
        // this.debugger = this.createDebugger();
        this.scene.background = new Color(0x0d0d0d);
        this.scene.add(new TwoPoints());
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'World' });
        return debug;
    }
}