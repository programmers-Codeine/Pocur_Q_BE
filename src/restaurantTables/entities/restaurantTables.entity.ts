import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Order } from 'src/orders/entities/orders.entity';

@Entity('restaurantTables')
export class RestaurantTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.tables, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column()
  table_num: number;

  @OneToMany(() => Order, (order) => order.restaurantTable)
  orders: Order[];
}
