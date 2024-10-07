import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsString, IsInt, MaxLength } from 'class-validator';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { Url } from 'src/urls/entities/urls.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Menu } from 'src/menus/entities/menus.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { Call } from 'src/calls/entities/calls.entity';
import { Design } from 'src/designs/entities/designs.entity';
import { Users } from 'src/users/entities/users.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.restaurants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'int', default: null, name: 'default_table_count' })
  defaultTableCount: number;

  @Column({ type: 'int', default: null, name: 'total_table_count' })
  totalTableCount: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  logo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  introduce: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(() => RestaurantTable, (table) => table.restaurant)
  tables: RestaurantTable[];

  @OneToMany(() => Url, (url) => url.restaurant)
  urls: Url[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => Category, (category) => category.restaurant)
  categories: Category[];

  @OneToMany(() => Call, (call) => call.restaurant)
  calls: Call[];

  @OneToMany(() => Design, (design) => design.restaurant)
  designs: Design[];
}
