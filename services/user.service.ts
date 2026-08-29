import { UserRepository } from "@/repositories/user.repository";
import bcrypt from "bcrypt";

type CreateUserInput = {
    email: string;
    username?: string;
    name?: string;
    password: string;
};

export class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
   
    async createUser(data: CreateUserInput) {
        const existingUserByEmail = await this.userRepository.findByEmail(data.email);  
        
        if (existingUserByEmail) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        const user = await this.userRepository.createUser({
            ...data,
            password: hashedPassword}
        );
        return user;
        
    }
}