import {MigrationInterface, QueryRunner} from "typeorm";

export class delayFeeInReservation1643483976011 implements MigrationInterface {
    name = 'delayFeeInReservation1643483976011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" ADD "isDelayed" boolean`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "totalDelayFee" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "totalDelayFee"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "isDelayed"`);
    }

}
