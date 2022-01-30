import { User } from "./User";

export interface Session {
    id: number;
    token: string;
    user: User;
}
