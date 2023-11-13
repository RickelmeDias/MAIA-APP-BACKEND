import { UsersEntity } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class EquipamentsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true, nullable: false })
  qrCode: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  imgsrc: string | null

  @Column()
  createdAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.equipaments)
  reservedByUser?: UsersEntity;

  @Column({ default: true })
  isActive?: boolean;
}