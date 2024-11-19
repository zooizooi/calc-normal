import { Color, Scene } from 'three';
import Debugger, { DebuggerFolder } from '@/Debugger';
import TriangleCPU from '@/components/TriangleCPU';

export default class WorldTriangleCPU {
    public scene = new Scene();
    private debugger: DebuggerFolder;

    constructor() {
        // this.debugger = this.createDebugger();
        this.scene.background = new Color(0x0d0d0d);
        this.scene.add(new TriangleCPU());
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'World' });
        return debug;
    }
}