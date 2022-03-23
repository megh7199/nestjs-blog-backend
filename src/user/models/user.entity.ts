import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class userEntity{
    @PrimaryColumn()
    id:number;
    
    @Column()
    name:string;

    @Column({unique:true})
    username:string;
    
 }