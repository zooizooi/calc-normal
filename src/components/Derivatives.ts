import { ArrowHelper, BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshBasicMaterial, Object3D, OctahedronGeometry, ShaderMaterial, Vector3 } from 'three';
import onUpdate from '@/hooks/onUpdate';

import fragmentShader from '@/shaders/derivatives/frag.glsl';
import vertexShader from '@/shaders/derivatives/vert.glsl';

export default class Derivatives extends Object3D {
    p0 = new Vector3(1, 0, 0.5);
    p1 = new Vector3(-1, 0, 0.5);
    p2 = new Vector3(0, 0, -0.5);
    directionalVectorA = new Vector3();
    directionalVectorB = new Vector3();
    normal = new Vector3();
    triangleCenter = new Vector3();
    mesh: Mesh;
    normalArrow: ArrowHelper;
    points: Mesh[];

    constructor() {
        super();
        this.mesh = this.createLine();
        this.normalArrow = this.createNormalArrow();
        this.points = this.addPoints();

        // Update
        onUpdate(this, this.update);
    }

    createLine() {
        const geometry = new BufferGeometry();

        const points = [...this.p0, ...this.p1, ...this.p2];
        geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
        geometry.setIndex([0, 2, 1]);

        const material = new ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms: {
                uTime: { value: 0 },
            },
        });

        const mesh = new Mesh(geometry, material);
        this.add(mesh);
        return mesh;
    }

    createNormalArrow() {
        const arrow = new ArrowHelper(this.normal, this.triangleCenter, 0.4, 0xff0000, 0.07, 0.035);
        this.add(arrow);
        return arrow;
    }

    updateNormal() {
        this.directionalVectorA.subVectors(this.p1, this.p0).normalize();
        this.directionalVectorB.subVectors(this.p2, this.p0).normalize();
        this.normal.crossVectors(this.directionalVectorB, this.directionalVectorA).normalize();
    }

    updateNormalArrow() {
        this.normalArrow.setDirection(this.normal);
        this.triangleCenter.addVectors(this.p0, this.p1).add(this.p2).divideScalar(3);
        this.normalArrow.position.copy(this.triangleCenter);
        this.normalArrow.setColor(new Color().set(this.normal.x, this.normal.y, this.normal.z));
    }

    createDirectionalArrows() {
        const arrows = [
            new ArrowHelper(new Vector3(), new Vector3(), 0.9, 0xffff00, 0.07, 0.035),
            new ArrowHelper(new Vector3(), new Vector3(), 0.9, 0xff00ff, 0.07, 0.035),
        ];
        arrows.forEach(arrow => this.add(arrow));
        return arrows;
    }

    addPoints() {
        const points = [this.p0, this.p1, this.p2];
        const meshes: Mesh[] = [];
        points.forEach(() => {
            const geometry = new OctahedronGeometry(0.013, 2);
            const material = new MeshBasicMaterial({ color: 0xff0000 });
            const mesh = new Mesh(geometry, material);
            meshes.push(mesh);
            this.add(mesh);
        });
        return meshes;
    }

    updatePoints() {
        this.points[0].position.copy(this.p0);
        this.points[1].position.copy(this.p1);
        this.points[2].position.copy(this.p2);
    }

    update() {
        this.mesh.material.uniforms.uTime.value = performance.now() / 1000;
        this.p0.y = Math.sin(performance.now() / 1000 * 0.4 + this.p0.z * this.p0.x * 1000) * 0.5;
        this.p1.y = Math.sin(performance.now() / 1000 * 0.4 + this.p1.z * this.p1.x * 1000) * 0.5;
        this.p2.y = Math.sin(performance.now() / 1000 * 0.4 + this.p2.z * this.p2.x * 1000) * 0.5;

        this.updateNormal();
        this.updateNormalArrow();
        this.updatePoints();
    }
}