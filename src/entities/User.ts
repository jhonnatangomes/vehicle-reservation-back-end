/* eslint-disable indent */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    static async getUserByEmail(email: string) {
        const user = await this.findOne({ email });
        return user;
    }

    static async createUser(name: string, email: string, password: string) {
        const user = this.create({ name, email, password });
        await this.save(user);
        return user;
    }

    static async getUserById(userId: number) {
        const user = await this.findOne({ id: userId });
        return user;
    }
}
