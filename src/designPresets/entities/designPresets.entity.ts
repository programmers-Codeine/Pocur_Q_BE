import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { Design } from 'src/designs/entities/designs.entity';

@Entity('designPresets')
export class DesignPreset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  background: string;

  @Column({ type: 'varchar', length: 45, name: 'big_text', nullable: true })
  bigText: string;

  @Column({ type: 'varchar', length: 45, name: 'small_text', nullable: true })
  smallText: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  box: string;

  @Column({ type: 'varchar', length: 45, name: 'box_border', nullable: true })
  boxBorder: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  icon: string;

  @Column({ type: 'varchar', length: 45, name: 'button_background', nullable: true })
  buttonBackground: string;

  @Column({ type: 'varchar', length: 45, name: 'button_text', nullable: true })
  buttonText: string;

  @Column({ type: 'varchar', length: 45, name: 'button_border', nullable: true })
  buttonBorder: string;

  @Column({ type: 'varchar', length: 45, name: 'button_active_background', nullable: true })
  buttonActiveBackground: string;

  @Column({ type: 'varchar', length: 45, name: 'button_active_text', nullable: true })
  buttonActiveText: string;

  @Column({ type: 'varchar', length: 45, name: 'button_active_border', nullable: true })
  buttonActiveBorder: string;

  @Column({ type: 'varchar', length: 45, name: 'lable_hot', nullable: true })
  labelHot: string;

  @Column({ type: 'varchar', length: 45, name: 'lable_new', nullable: true })
  labelNew: string;

  @Column({ type: 'varchar', length: 45, name: 'lable_sold_out', nullable: true })
  labelSoldOut: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.designPresets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToMany(() => Design, (design) => design.designPreset)
  designs: Design[];
}
