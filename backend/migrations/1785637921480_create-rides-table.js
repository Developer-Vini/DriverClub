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
    pgm.createTable('rides', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('gen_random_uuid()'),
        },
        passenger_id: {
            type: 'uuid',
            notNull: true,
            references: 'users',
        },
        driver_id: {
            type: 'uuid',
            notNull: false,
            references: 'drivers',
        },
        origin: {
            type: 'geography(Point, 4326)',
            notNull: true,
        },
        destination: {
            type: 'geography(Point, 4326)',
            notNull: true,
        },
        status: {
            type: 'varchar(20)',
            notNull: true,
            default: 'requested',
        },
        price: {
            type: 'numeric(10, 2)',
            notNull: false,
        },
        requested_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('now()'),
        },
        accepted_at: {
            type: 'timestamp',
            notNull: false,
        },
        completed_at: {
            type: 'timestamp',
            notNull: false,
        },
    });

    pgm.createIndex('rides', 'origin', { method: 'gist' });
    pgm.createIndex('rides', 'destination', { method: 'gist' });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => { pgm.dropTable('rides'); };
