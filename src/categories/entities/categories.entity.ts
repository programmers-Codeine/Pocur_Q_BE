import { IsString, MaxLength } from 'class-validator';
import { Menu } from 'src/menus/entities/menus.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_name', type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  categoryName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Menu, (menu) => menu.category, { onDelete: 'CASCADE' })
  menus: Menu[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}
