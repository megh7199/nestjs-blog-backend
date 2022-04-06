import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";
import { userRoles } from "./user.interface";

@Entity()
export class userEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column({unique:true})
    username:string;
    
    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    password:string;

    @Column({type:'enum',enum:userRoles,default:'user'})
    role:userRoles

    @BeforeInsert()
    emailToLower(){
        this.email = this.email.toLowerCase();
    }
 }