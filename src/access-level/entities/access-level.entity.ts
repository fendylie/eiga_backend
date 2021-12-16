import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId?: string;

  @Column()
  userId?: string;
}
