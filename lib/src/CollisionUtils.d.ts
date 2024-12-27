interface Transform {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    alpha: number;
}
interface RectangleCollider {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
}
interface EllipseCollider {
    type: "ellipse";
    x: number;
    y: number;
    width: number;
    height: number;
}
interface PolygonCollider {
    type: "polygon";
    x: number;
    y: number;
    points: {
        x: number;
        y: number;
    }[];
}
type Collider = RectangleCollider | EllipseCollider | PolygonCollider;
declare class CollisionUtils {
    checkCollision(colliderA: Collider, transformA: Transform, colliderB: Collider, transformB: Transform): boolean;
    checkPointInCollider(pointX: number, pointY: number, collider: Collider, transform: Transform): boolean;
    private isValidTransform;
    isPointInsideRect(pointX: number, pointY: number, rect: RectangleCollider, transform: Transform): boolean;
    isPointInsideEllipse(pointX: number, pointY: number, ellipse: EllipseCollider, transform: Transform): boolean;
    isPointInsidePolygon(pointX: number, pointY: number, polygon: PolygonCollider, transform: Transform): boolean;
    isLineIntersectingLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean;
    rectRectCollision(rectA: RectangleCollider, transformA: Transform, rectB: RectangleCollider, transformB: Transform): boolean;
    private getRectVertices;
    ellipseEllipseCollision(ellipseA: EllipseCollider, transformA: Transform, ellipseB: EllipseCollider, transformB: Transform): boolean;
    private approximateEllipse;
    rectEllipseCollision(rect: RectangleCollider, rectTransform: Transform, ellipse: EllipseCollider, ellipseTransform: Transform): boolean;
    ellipsePolygonCollision(ellipse: EllipseCollider, ellipseTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    rectPolygonCollision(rect: RectangleCollider, rectTransform: Transform, polygon: PolygonCollider, polygonTransform: Transform): boolean;
    polygonPolygonCollision(polygonA: PolygonCollider, transformA: Transform, polygonB: PolygonCollider, transformB: Transform): boolean;
    private transformPolygonPoints;
    private doPolygonsIntersect;
}
declare const _default: CollisionUtils;
export default _default;
//# sourceMappingURL=CollisionUtils.d.ts.map