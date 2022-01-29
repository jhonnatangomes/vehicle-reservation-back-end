import { getConnection } from "typeorm";
import VehicleImage from "../../src/entities/Image";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import Vehicle from "../../src/entities/Vehicle";

export default async function deleteTables() {
    await getConnection().createQueryBuilder().delete().from(Session).execute();
    await getConnection().createQueryBuilder().delete().from(User).execute();
    await getConnection()
        .createQueryBuilder()
        .delete()
        .from(VehicleImage)
        .execute();
    await getConnection().createQueryBuilder().delete().from(Vehicle).execute();
}
