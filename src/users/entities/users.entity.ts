import { EquipamentsEntity } from 'src/equipaments/entities/equipaments.entity';
import { Role } from '../../auth/enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => EquipamentsEntity, (equipament) => equipament.reservedByUser)
  equipaments?: EquipamentsEntity[]

  @Column({ default: true })
  isActive?: boolean;
}