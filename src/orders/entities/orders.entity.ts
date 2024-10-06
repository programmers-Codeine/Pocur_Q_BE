import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Menu } from 'src/menus/entities/menus.entity';
import { Option } from 'src/options/entities/options.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true, name: 'table_num' })
  tableNum: number;

  @Column({ type: 'timestamp', nullable: true, name: 'ordered_at' })
  orderedAt: Date;

  @Column({ type: 'int', nullable: true })
  count: number;

  @Column({ type: 'int', nullable: true, name: 'total_price' })
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => Menu, (menu) => menu.orders)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToMany(() => Option, { eager: true })
  @JoinTable({
    name: 'orderOptions',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'option_id',
      referencedColumnName: 'id',
    },
  })
  options?: Option[];
}
