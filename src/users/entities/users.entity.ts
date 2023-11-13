import { Role } from '../../auth/enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  ra: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  team: string;

  @Column()
  createdAt: Date;

  @Column("text", { array: true })
  roles: Role[];

  @Column({ default: true })
  isActive?: boolean;
}