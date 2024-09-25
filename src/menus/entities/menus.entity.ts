import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('menus')
export class Menus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  restaurant_id: string;

  @Column({ type: 'varchar', length: 45 })
  category_id: string;

  @Column({ type: 'varchar', length: 45 })
  menu_name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  menu_detail: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  menu_img: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  origin: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  sold_out: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;
}
