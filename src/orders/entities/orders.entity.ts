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
import { Expose } from 'class-transformer';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Menu } from 'src/menus/entities/menus.entity';
import { Option } from 'src/options/entities/options.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'int', nullable: true })
  @Expose({ name: 'tableNum' })
  table_num: number;

  @Column({ type: 'timestamp', nullable: true })
  @Expose({ name: 'orderedAt' })
  ordered_at: Date;

  @Column({ type: 'int', nullable: true })
  @Expose()
  count: number;

  @Column({ type: 'int', nullable: true })
  @Expose({ name: 'totalPrice' })
  total_price: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose({ name: 'createdAt' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Expose({ name: 'updatedAt' })
  updated_at: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  @Expose()
  restaurant: Restaurant;

  @ManyToOne(() => Menu, (menu) => menu.orders)
  @JoinColumn({ name: 'menu_id' })
  @Expose()
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
  options: Option[];
}
