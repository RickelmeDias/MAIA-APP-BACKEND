import { ActionsEnum } from 'src/common/enums/actions.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class LogsEquipmentsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text')
  action: ActionsEnum;

  @Column()
  actionByUserName: string;

  @Column()
  actionByUserRa: string;

  @Column()
  equipmentName: string;

  @Column()
  createdAt: Date;
}
