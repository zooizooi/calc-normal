import { ArrowHelper, BufferGeometry, Color, Line, Mesh, MeshBasicMaterial, Object3D, OctahedronGeometry, StreamDrawUsage, Vector3 } from 'three';
import onUpdate from '@/hooks/onUpdate';

export default class TriangleCPU extends Object3D {
    p0 = new Vector3(1, 0, 0.5);
    p1 = new Vector3(-1, 0, 0.5);
    p2 = new Vector3(0, 0, -0.5);
    directionalVectorA = new Vector3();
    directionalVectorB = new Vector3();
    normal = new Vector3();
    triangleCenter = new Vector3();
    line: Line;
    normalArrow: ArrowHelper;
    directionalArrows: ArrowHelper[];
    points: Mesh[];

    constructor() {
        super();
        this.line = this.createLine();
        this.normalArrow = this.createNormalArrow();
        this.directionalArrows = this.createDirectionalArrows();
        this.points = this.addPoints();

        // Update
        onUpdate(this, this.update);
    }

    createLine() {
        const points = [this.p0, this.p1, this.p2, this.p0];
        const geometry = new BufferGeometry().setFromPoints(points);
        geometry.attributes.position.setUsage(StreamDrawUsage);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new Line(geometry, material);
        this.add(mesh);
        return mesh;
    }

    updateLineGeometry() {
        const geometry = this.line.geometry;
        const position = geometry.attributes.position.array;
        position[0] = this.p0.x;
        position[1] = this.p0.y;
        position[2] = this.p0.z;
        position[3] = this.p1.x;
        position[4] = this.p1.y;
        position[5] = this.p1.z;
        position[6] = this.p2.x;
        position[7] = this.p2.y;
        position[8] = this.p2.z;
        position[9] = this.p0.x;
        position[10] = this.p0.y;
        position[11] = this.p0.z;
        geometry.attributes.position.needsUpdate = true;
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

    updateDirectionalArrows() {
        this.directionalArrows[0].setDirection(this.directionalVectorA);
        this.directionalArrows[0].position.copy(this.p0);
        this.directionalArrows[1].setDirection(this.directionalVectorB);
        this.directionalArrows[1].position.copy(this.p0);
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
        this.p0.y = Math.sin(performance.now() / 1000 * 0.4 + this.p0.z * this.p0.x * 1000) * 0.5;
        this.p1.y = Math.sin(performance.now() / 1000 * 0.4 + this.p1.z * this.p1.x * 1000) * 0.5;
        this.p2.y = Math.sin(performance.now() / 1000 * 0.4 + this.p2.z * this.p2.x * 1000) * 0.5;

        this.updateLineGeometry();
        this.updateNormal();
        this.updateNormalArrow();
        this.updateDirectionalArrows();
        this.updatePoints();
    }
}