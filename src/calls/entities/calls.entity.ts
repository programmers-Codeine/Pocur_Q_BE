import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'call_name', type: 'varchar', length: 45 })
  callName: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.calls, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}
