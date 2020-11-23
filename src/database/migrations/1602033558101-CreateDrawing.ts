import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDrawing1602033558101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'drawings',
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
                name: 'height',
                type: 'float',
              },
              {
                name: 'width',
                type: 'float',
              },
              {
                name: 'cost',
                type: 'float',
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
        await queryRunner.dropTable('drawing');
    }

}
