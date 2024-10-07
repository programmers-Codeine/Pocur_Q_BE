import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Expose } from 'class-transformer';

@Entity('restaurantTables')
export class RestaurantTable {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.tables, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  @Expose({ name: 'restaurantId' })
  restaurant: Restaurant;

  @Column()
  @Expose({ name: 'tableNum' })
  table_num: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  @Expose({ name: 'createdAt' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  @Expose({ name: 'updatedAt' })
  updated_at: Date;
}
