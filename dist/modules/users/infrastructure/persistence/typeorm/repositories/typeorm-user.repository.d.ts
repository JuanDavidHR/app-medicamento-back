import { Repository } from "typeorm";
import { User } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/repositories/user.repository.interface";
export declare class TypeOrmUserRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
}
