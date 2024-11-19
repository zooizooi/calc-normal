import { Color, PointLight, Scene } from 'three';
import Debugger, { DebuggerFolder } from '@/Debugger';
import Derivatives from '@/components/Derivatives';

export default class WorldDerivatives {
    public scene = new Scene();
    private debugger: DebuggerFolder;

    constructor() {
        // this.debugger = this.createDebugger();
        this.scene.background = new Color(0x0d0d0d);
        this.scene.add(new Derivatives());

        const pointLight = new PointLight(0xff0000);
        pointLight.position.set(2, 2, 0);
        this.scene.add(pointLight);
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'World' });
        return debug;
    }
}