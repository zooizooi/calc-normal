// Vendor
import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { ButtonGridApi } from '@tweakpane/plugin-essentials';
import { KeyboardHandler, LocalStorage } from '@zooizooi/utils';
import { KEY_DOWN, KeyDirection } from '@zooizooi/utils/modules/KeyboardHandler';

// Modules
import Debugger, { DebuggerFolder } from '@/Debugger';
import Globals from '@/Globals';

// Hooks
import onWindowResize from '@/hooks/onWindowResize';
import onUpdate from '@/hooks/onUpdate';

const DEFAULT_CAMERA_POSITION = new Vector3(0, 0.5, 2.5);
const LOCAL_STORAGE_CAMERA_SETTINGS = 'camera-settings';

export default class PortalCamera {
    public camera: PerspectiveCamera;
    public controls: OrbitControls | undefined;
    private debugger: DebuggerFolder;

    constructor() {
        this.createKeyboardHandler();
        this.debugger = this.createDebugger();
        this.camera = this.createCamera();
        this.controls = this.createControls();
        this.loadCameraPosition();

        // Hooks
        onUpdate(this, this.update);
        onWindowResize(this, this.resize);
    }

    private createKeyboardHandler() {
        const keymap = {
            'Ctrl+s': this.keyCtrlSHandler,
        };

        return new KeyboardHandler({
            scope: this,
            keymap,
        });
    }

    private createDebugger() {
        const debug = Debugger.addFolder({ title: 'Camera' });
        const positionButtonGrid = debug.addBlade({
            view: 'buttongrid',
            size: [2, 1],
            cells: (x: number, y: number) => ({
                title: [
                    ['Store', 'Reset'],
                ][y][x],
            }),
            label: 'position',
        }) as ButtonGridApi;
        positionButtonGrid.on('click', (event) => {
            if (event.cell.title === 'Store') this.storeCameraPosition();
            if (event.cell.title === 'Reset') this.resetCameraPosition();
        });
        return debug;
    }

    private createCamera() {
        const camera = new PerspectiveCamera(50, 1);
        camera.position.copy(DEFAULT_CAMERA_POSITION);
        this.debugger.addBinding(camera, 'fov', { min: 1, max: 180 }).on('change', () => camera.updateProjectionMatrix());
        return camera;
    }

    private createControls() {
        if (Globals.renderer) {
            return new OrbitControls(this.camera, Globals.renderer.domElement);
        }
        return undefined;
    }

    private storeCameraPosition() {
        LocalStorage.set(LOCAL_STORAGE_CAMERA_SETTINGS, {
            position: this.camera.position,
            target: this.controls?.target,
        });
        this.debugger.refresh();
        console.log('📷 Camera position stored');
    }

    private loadCameraPosition() {
        const data: any = LocalStorage.get(LOCAL_STORAGE_CAMERA_SETTINGS);
        if (!data) return;
        this.camera.position.set(data.position.x, data.position.y, data.position.z);
        this.controls?.target.set(data.target.x, data.target.y, data.target.z);
        this.debugger.refresh();
        console.log('📷 Camera position loaded');
    }

    private resetCameraPosition() {
        this.camera.position.copy(DEFAULT_CAMERA_POSITION);
        this.controls?.target.set(0, 0, 0);
        LocalStorage.remove(LOCAL_STORAGE_CAMERA_SETTINGS);
        this.debugger.refresh();
        console.log('📷 Camera position was reset');
    }

    private update() {
        this.controls?.update();
    }

    private resize() {
        this.camera.aspect = (window.innerWidth / 2) / (window.innerHeight / 2);
        this.camera.updateProjectionMatrix();
    }

    private keyCtrlSHandler(direction: KeyDirection, event: KeyboardEvent) {
        if (direction === KEY_DOWN) {
            event.preventDefault();
            this.storeCameraPosition();
        }
    }
}