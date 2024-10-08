import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { DesignPreset } from 'src/designPresets/entities/designPresets.entity';

@Entity('designs')
export class Design {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.designs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => DesignPreset, (designPreset) => designPreset.designs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'designPreset_id' })
  designPreset: DesignPreset;
}
