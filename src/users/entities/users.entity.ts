import { EquipmentsEntity } from 'src/equipments/entities/equipments.entity';
import { Role } from '../../auth/enum/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LogsEquipmentsEntity } from 'src/logs-equipments/entities/logs-equipments.entity';

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

  @Column('text', { array: true })
  roles: Role[];

  @OneToMany(() => EquipmentsEntity, (equipment) => equipment.reservedByUser)
  equipments?: EquipmentsEntity[];

  @Column({ default: true })
  isActive?: boolean;
}
