import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class DatabaseFile {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  filename: string;
 
  @Column({
    type: 'bytea',
    nullable:true
  })
  data: Buffer;
}
 
export default DatabaseFile;