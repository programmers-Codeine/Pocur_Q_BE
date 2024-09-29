import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  restaurant_id: string;

  @Column({ type: 'varchar', length: 45 })
  call_name: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.call, { onDelete: 'CASCADE' })
  restaurant: Restaurant;
}
