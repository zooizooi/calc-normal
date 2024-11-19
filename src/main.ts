// Style
import './style.css';

// Vendor
import { Color } from 'three';
// import AssetLoader, { ImageLoader, GltfLoader, TextureLoader } from '@zooizooi/asset-loader';

// Modules
import Assets from '@/Assets';
import Renderer from '@/Renderer';
import Globals from '@/Globals';

// Worlds
import WorldTriangleCPU from '@/worlds/WorldTriangleCPU';
import WorldTriangleGPU from '@/worlds/WorldTriangleGPU';
import WorldTwoPoints from '@/worlds/WorldTwoPoints';
import WorldDerivatives from '@/worlds/WorldDerivatives';

// Hooks
import onUpdate from '@/hooks/onUpdate';

// Configs
import assets from '@/configs/assets';
import Camera from '@/Camera';

// AssetLoader
// AssetLoader.addLoader('gltf', GltfLoader, { decoderPath: '/draco/' });
// AssetLoader.addLoader('image', ImageLoader);
// AssetLoader.addLoader('texture', TextureLoader);

Assets.loadList(assets).then(() => {
    // Renderer
    const renderer = new Renderer();
    document.body.appendChild(renderer.domElement);
    Globals.renderer = renderer;

    // Worlds
    const worldTriangleCPU = new WorldTriangleCPU();
    const worldTriangleGPU = new WorldTriangleGPU();
    const worldTwoPoints = new WorldTwoPoints();
    const worldDerivatives = new WorldDerivatives();

    // Camera
    const camera = new Camera();

    onUpdate(() => {
        const halfViewWidth = renderer.dimensions.width / 2;
        const halfViewHeight = renderer.dimensions.height / 2;

        renderer.renderer.setClearColor(new Color(0xff0000), 1);

        renderer.renderer.setScissor(0, halfViewHeight + 1, halfViewWidth, halfViewHeight);
        renderer.renderer.setViewport(0, halfViewHeight + 1, halfViewWidth, halfViewHeight);
        renderer.render(worldTriangleCPU.scene, camera.camera);

        renderer.renderer.setScissor(halfViewWidth + 1, halfViewHeight + 1, halfViewWidth, halfViewHeight);
        renderer.renderer.setViewport(halfViewWidth + 1, halfViewHeight + 1, halfViewWidth, halfViewHeight);
        renderer.render(worldTriangleGPU.scene, camera.camera);

        renderer.renderer.setScissor(halfViewWidth + 1, 0, halfViewWidth, halfViewHeight);
        renderer.renderer.setViewport(halfViewWidth + 1, 0, halfViewWidth, halfViewHeight);
        renderer.render(worldTwoPoints.scene, camera.camera);

        renderer.renderer.setScissor(0, 0, halfViewWidth, halfViewHeight);
        renderer.renderer.setViewport(0, 0, halfViewWidth, halfViewHeight);
        renderer.render(worldDerivatives.scene, camera.camera);
    });
});