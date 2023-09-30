import * as alt from '@altv/server';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { Interaction } from '../../shared/interfaces/interaction';
import { sha256Random } from '../utility/hash';

const DEFAULT_INTERACTION_HEIGHT = 3;

export class InteractionShape {
    interaction: Interaction = {
        position: { x: 0, y: 0, z: 0 },
    };
    colShape: alt.ColShapeCylinder;

    constructor(interaction: Required<Interaction>) {
        this.colShape = alt.ColShapeCylinder.create({
            pos: interaction.position,
            radius: interaction.range,
            height: interaction.height ? interaction.height : DEFAULT_INTERACTION_HEIGHT,
        });

        // Set the dimension based on specifications from the interaction interface
        if (this.colShape.dimension === undefined || this.colShape.dimension === null) {
            this.colShape.dimension = 0;
        } else {
            this.colShape.dimension = interaction.dimension;
        }

        this.interaction = interaction;
    }
}

export class GarageSpaceShape {
    private rotation: alt.IVector3;
    private isOpen: boolean = true;
    isGarage: boolean = true;

    colShape: alt.ColShapeSphere;
    constructor(position: alt.IVector3, rotation: alt.IVector3, radius: number) {
        this.colShape = alt.ColShapeSphere.create({
            pos: position,
            radius: radius,
        });
        this.rotation = rotation;
    }

    setSpaceStatus(value: boolean) {
        this.isOpen = value;
    }

    getPositionAndRotation() {
        return { position: this.colShape.pos, rotation: this.rotation };
    }

    getSpaceStatus() {
        return this.isOpen;
    }
}

export class PolygonShape {
    uid: string;
    vertices: Array<alt.IVector2>;
    isPlayerOnly: boolean;
    isVehicleOnly: boolean;
    isPolygonShape = true;
    isDebug = false;

    colShape: alt.ColShapePolygon;

    private enterCallbacks: Array<(shape: PolygonShape, entity: alt.Vehicle | alt.Player | alt.Entity) => void> = [];
    private leaveCallbacks: Array<(shape: PolygonShape, entity: alt.Vehicle | alt.Player | alt.Entity) => void> = [];

    /**
     * Creates an expensive instance of PolygonShape.
     *
     * Enter / Exit can be fetched with 'entityEnterColshape' and 'entityLeaveColshape' events
     *
     * @param {number} minZ The floor level of the polygon
     * @param {number} maxZ The max height of the polygon
     * @param {Array<alt.IVector2>} vertices An array of `x, y` to determine where to draw the polygon around
     *
     */
    constructor(
        minZ: number,
        maxZ: number,
        vertices: alt.IVector2[] | alt.IVector3[],
        isPlayerOnly: boolean,
        isVehicleOnly: boolean,
        debug = false,
    ) {
        const processedVertices = vertices.map((pos) => {
            return new alt.Vector2(pos.x, pos.y);
        });

        this.colShape = alt.ColShapePolygon.create({ minZ: minZ, maxZ: maxZ, points: processedVertices });
        this.vertices = processedVertices;
        this.isPolygonShape = true;
        this.isPlayerOnly = isPlayerOnly;
        this.isVehicleOnly = isVehicleOnly;
        this.uid = sha256Random(JSON.stringify(this));
        this.isDebug = debug;
    }

    addEnterCallback(callback: (shape: PolygonShape, entity: alt.Vehicle | alt.Player | alt.Entity) => void) {
        this.enterCallbacks.push(callback);
    }

    addLeaveCallback(callback: (shape: PolygonShape, entity: alt.Vehicle | alt.Player | alt.Entity) => void) {
        this.leaveCallbacks.push(callback);
    }

    invokeEnterCallbacks(entity: alt.Entity) {
        for (let i = 0; i < this.enterCallbacks.length; i++) {
            this.enterCallbacks[i](this, entity);
        }
    }

    invokeLeaveCallbacks(entity: alt.Entity) {
        for (let i = 0; i < this.leaveCallbacks.length; i++) {
            this.leaveCallbacks[i](this, entity);
        }
    }
}

alt.Events.on('entityEnterColshape', (colshape: alt.ColShape, entity: alt.Entity) => {
    if (!(colshape instanceof PolygonShape)) {
        return;
    }

    if (!colshape.isPolygonShape) {
        return;
    }

    if (entity instanceof alt.Player && colshape.isPlayerOnly) {
        colshape.invokeEnterCallbacks(entity);

        if (colshape.isDebug) {
            entity.emit(SYSTEM_EVENTS.DEBUG_COLSHAPE_VERTICES, colshape.uid, colshape.vertices);
        }
    }

    if (entity instanceof alt.Vehicle && colshape.isVehicleOnly) {
        colshape.invokeEnterCallbacks(entity);

        if (colshape.isDebug && entity.driver) {
            entity.driver.emit(SYSTEM_EVENTS.DEBUG_COLSHAPE_VERTICES, colshape.uid, colshape.vertices);
        }
    }
});

alt.Events.on('entityLeaveColshape', (colshape: alt.ColShape, entity: alt.Entity) => {
    if (!(colshape instanceof PolygonShape)) {
        return;
    }

    if (!colshape.isPolygonShape) {
        return;
    }

    if (entity instanceof alt.Player && colshape.isPlayerOnly) {
        colshape.invokeLeaveCallbacks(entity);
    }

    if (entity instanceof alt.Vehicle && colshape.isVehicleOnly) {
        colshape.invokeLeaveCallbacks(entity);
    }
});
