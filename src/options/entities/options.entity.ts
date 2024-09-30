import { Menu } from 'src/menus/entities/menus.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'option_name', type: 'varchar', length: 45 })
  optionName: string;

  @Column({ name: 'option_price', type: 'int' })
  optionPrice: number;

  @ManyToOne(() => Menu, (menu) => menu.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
