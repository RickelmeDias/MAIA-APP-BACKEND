import { UsersEntity } from 'src/users/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  reservedByUser?: UsersEntity | null

  @Column()
  createdAt: Date;

  @Column({ default: true })
  isActive?: boolean;
}