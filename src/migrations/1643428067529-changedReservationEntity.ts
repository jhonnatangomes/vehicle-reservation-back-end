import {MigrationInterface, QueryRunner} from "typeorm";

export class changedReservationEntity1643428067529 implements MigrationInterface {
    name = 'changedReservationEntity1643428067529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_6fb87e1394cb3af4f5745c37d7d"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "REL_aa0e1cc2c4f54da32bf8282154"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "REL_6fb87e1394cb3af4f5745c37d7"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_6fb87e1394cb3af4f5745c37d7d" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_6fb87e1394cb3af4f5745c37d7d"`);
        await queryRunner.query(`ALTER TABLE "reservations" DROP CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c"`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "REL_6fb87e1394cb3af4f5745c37d7" UNIQUE ("vehicleId")`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "REL_aa0e1cc2c4f54da32bf8282154" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_6fb87e1394cb3af4f5745c37d7d" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservations" ADD CONSTRAINT "FK_aa0e1cc2c4f54da32bf8282154c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
