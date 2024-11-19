import onWindowResize from '@/hooks/onWindowResize';
import { WebGLRenderer, Scene, Camera, PCFSoftShadowMap, Vector2 } from 'three';

export default class Renderer {
    public renderer: WebGLRenderer;
    public domElement: HTMLCanvasElement;
    public dimensions = new Vector2();

    constructor() {
        this.renderer = this.createRenderer();
        this.domElement = this.renderer.domElement;

        // Hooks
        onWindowResize(this, this.resize);
    }

    private createRenderer() {
        const renderer = new WebGLRenderer({
            antialias: true,
        });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = PCFSoftShadowMap;
        renderer.setScissorTest(true);
        return renderer;
    }

    public render(scene: Scene, camera: Camera) {
        this.renderer.render(scene, camera);
    }

    public resize() {
        this.dimensions.set(window.innerWidth, window.innerHeight);
        this.renderer.setSize(this.dimensions.width, this.dimensions.height);
    }
}