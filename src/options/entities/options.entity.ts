import { Menus } from 'src/menus/entities/menus.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  option_name: string;

  @Column({ type: 'int' })
  option_price: number;

  @ManyToOne(() => Menus, (menu) => menu.options)
  @JoinColumn({ name: 'menu_id' })
  menu: Menus;
}