import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrder1603152940589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'orders',
              columns: [
                {
                  name: 'id',
                  type: 'string',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()'
                },
                {
                  name: 'id_user',
                  type: 'string',
                  isNullable: true,
                },
                {
                  name: 'id_provider',
                  type: 'string',
                  isNullable: true,
                },
                {
                  name: 'id_drawing',
                  type: 'string',
                  isNullable: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['id_provider'],
            referencedColumnNames: ['id'],
            referencedTableName: 'providers',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['id_drawing'],
            referencedColumnNames: ['id'],
            referencedTableName: 'drawings',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
