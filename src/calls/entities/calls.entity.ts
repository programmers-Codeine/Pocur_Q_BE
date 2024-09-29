import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  restaurant_id: string;

  @Column({ type: 'varchar', length: 45 })
  call_name: string;

  //Todo: 레스토랑과 관계 설정해주기
}
