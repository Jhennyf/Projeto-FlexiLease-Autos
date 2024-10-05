import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCarIdToCreateReserve1727892942058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'reserve',
      new TableColumn({
        name: 'car_id',
        type: 'integer',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'reserve',
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'car',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('reserve');
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('car_id') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('reserve', foreignKey);
      }
      await queryRunner.dropColumn('reserve', 'car_id');
    }
  }
}
