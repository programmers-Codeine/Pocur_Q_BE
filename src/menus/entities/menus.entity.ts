import { Category } from 'src/categories/entities/categories.entity';
import { Option } from 'src/options/entities/options.entity';
import { Order } from 'src/orders/entities/orders.entity';
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

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'menu_name', type: 'varchar', length: 45 })
  menuName: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ name: 'menu_detail', type: 'varchar', length: 50, nullable: true })
  menuDetail: string;

  @Column({ name: 'menu_img', type: 'varchar', length: 45, nullable: true })
  menuImg: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  origin: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'sold_out', default: false })
  soldOut: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;

  @OneToMany(() => Option, (option) => option.menu, { eager: true, onDelete: 'CASCADE' })
  options: Option[];

  @OneToMany(() => Order, (order) => order.menu)
  orders: Order[];

  @ManyToOne(() => Category, (category) => category.menus)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}
