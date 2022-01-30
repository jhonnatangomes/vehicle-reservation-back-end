import {MigrationInterface, QueryRunner} from "typeorm";

export class vehiclePricing1643423029302 implements MigrationInterface {
    name = 'vehiclePricing1643423029302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "pricePerDay" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "returnDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD "totalToPay" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "totalToPay"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "pricePerDay"`);
    }

}
