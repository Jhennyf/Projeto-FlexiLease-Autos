import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCarIdToCreateReserve1727892942058
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'reserve',
      new TableColumn({
        name: 'car_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'reserve',
      new TableForeignKey({
        name: 'ReserveCar',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'car',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('reserve', 'ReserveCar');
    await queryRunner.dropColumn('reserve', 'car_id');
  }
}
