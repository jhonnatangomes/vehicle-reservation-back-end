import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDaysRented1643480560305 implements MigrationInterface {
    name = 'addedDaysRented1643480560305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "daysRented" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "daysRented"`);
    }

}
