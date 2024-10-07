import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Expose } from 'class-transformer';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ManyToOne(() => Restaurant, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'restaurant_id' })
  @Expose({ name: 'restaurantId' })
  restaurant: Restaurant;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Expose()
  url: string;
}
