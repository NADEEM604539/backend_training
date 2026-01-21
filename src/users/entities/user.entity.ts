import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

    
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty({ nullable: true })
    name: string | null
    @ApiProperty()
    @Exclude()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}
