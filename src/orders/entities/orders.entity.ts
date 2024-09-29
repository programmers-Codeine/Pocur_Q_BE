import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { Menu } from 'src/menus/entities/menus.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: true })
  ordered_at: Date;

  @Column({ type: 'int', nullable: true })
  count: number;

  @Column({ type: 'int', nullable: true })
  total_price: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => RestaurantTable, (restaurantTable) => restaurantTable.orders)
  @JoinColumn({ name: 'restaurantTable_id' })
  restaurantTable: RestaurantTable;

  @ManyToOne(() => Menu, (menu) => menu.orders)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
