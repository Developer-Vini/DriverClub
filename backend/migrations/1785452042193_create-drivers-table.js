/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('drivers', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()'),
        },
        user_id: {
            type: 'uuid',
            notNull: true,
            unique: true,
            references: 'users',
            onDelete: 'cascade',
        },
        license_plate: {
            type: 'varchar(10)',
            notNull: true,
            unique: true
        },
        vehicle_model: {
            type: 'varchar(100)',
            notNull: true,
        },
        driver_license_number: {
            type: 'varchar(30)',
            notNull: true,
            unique: true,
        },
        approval_status: {
            type: 'varchar(20)',
            notNull: true,
            default: 'pending',
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('now()'),
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('drivers')
};
