import { getConnection } from "typeorm";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";

export default async function deleteTables() {
    await getConnection().createQueryBuilder().delete().from(Session).execute();
    await getConnection().createQueryBuilder().delete().from(User).execute();
}
