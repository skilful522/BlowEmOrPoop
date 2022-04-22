export const isCollisionOccurred = (environmentEntity, entity2) =>
    environmentEntity.distance < environmentEntity.radius + entity2.radius