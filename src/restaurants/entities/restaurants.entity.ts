import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsInt, MaxLength } from 'class-validator';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { Url } from 'src/urls/entities/urls.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Menu } from 'src/menus/entities/menus.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  user_id: string;

  @Column({ type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  name: string;

  @Column({ type: 'int', default: null })
  @IsInt()
  default_table_count: number;

  @Column({ type: 'int', default: null })
  @IsInt()
  total_table_count: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsString()
  @MaxLength(45)
  logo: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsString()
  @MaxLength(45)
  introduce: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsString()
  @MaxLength(45)
  comment: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;

  @OneToMany(() => RestaurantTable, (table) => table.restaurant)
  tables: RestaurantTable[];

  @OneToMany(() => Url, (url) => url.restaurant)
  urls: Url[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => Category, (category) => category.restaurant)
  category: Category[];
}
