import { Color, Scene } from 'three';
import Debugger, { DebuggerFolder } from '@/Debugger';
import TriangleGPU from '@/components/TriangleGPU';

export default class WorldTriangleGPU {
    public scene = new Scene();
    private debugger: DebuggerFolder;

    constructor() {
        // this.debugger = this.createDebugger();
        this.scene.background = new Color(0x0d0d0d);
        this.scene.add(new TriangleGPU());
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'World' });
        return debug;
    }
}