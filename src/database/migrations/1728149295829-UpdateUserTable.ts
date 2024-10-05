import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserTable1728149295829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    const columnsToAdd = [
      { name: 'qualified', type: 'boolean', default: false },
      { name: 'neighbordhood', type: 'varchar', default: "'Unknown'" },
      { name: 'street', type: 'varchar', default: "'Unknown'" },
      { name: 'complement', type: 'varchar', default: "'Unknown'" },
      { name: 'city', type: 'varchar', default: "'Unknown'" },
      { name: 'uf', type: 'varchar', default: "'Unknown'" },
    ];

    for (const column of columnsToAdd) {
      if (!table?.findColumnByName(column.name)) {
        await queryRunner.addColumn(
          'user',
          new TableColumn({
            name: column.name,
            type: column.type,
            isNullable: false,
            default: column.default,
          }),
        );
      } else {
        await queryRunner.changeColumn(
          'user',
          column.name,
          new TableColumn({
            name: column.name,
            type: column.type,
            isNullable: false,
            default: column.default,
          }),
        );
      }
    }

    await queryRunner.query(`UPDATE "user" SET "qualified" = false WHERE "qualified" IS NULL`);
    await queryRunner.query(`UPDATE "user" SET "neighbordhood" = 'Unknown' WHERE "neighbordhood" IS NULL`);
    await queryRunner.query(`UPDATE "user" SET "street" = 'Unknown' WHERE "street" IS NULL`);
    await queryRunner.query(`UPDATE "user" SET "complement" = 'Unknown' WHERE "complement" IS NULL`);
    await queryRunner.query(`UPDATE "user" SET "city" = 'Unknown' WHERE "city" IS NULL`);
    await queryRunner.query(`UPDATE "user" SET "uf" = 'Unknown' WHERE "uf" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const columnsToRemove = ['qualified', 'neighbordhood', 'street', 'complement', 'city', 'uf'];

    for (const column of columnsToRemove) {
      await queryRunner.dropColumn('user', column);
    }
  }
}
