import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Provider1602033475647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'providers',
              columns: [
                {
                  name: 'id',
                  type: 'string',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()'
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isUnique: true,
                },
                {
                  name: 'password',
                  type: 'varchar',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('providers');
    }

}
