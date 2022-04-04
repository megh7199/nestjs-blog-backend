import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

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

    @BeforeInsert()
    emailToLower(){
        this.email = this.email.toLowerCase();
    }
 }