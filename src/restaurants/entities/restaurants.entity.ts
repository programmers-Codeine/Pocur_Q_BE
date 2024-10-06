import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsInt, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { RestaurantTable } from 'src/restaurantTables/entities/restaurantTables.entity';
import { Url } from 'src/urls/entities/urls.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Menu } from 'src/menus/entities/menus.entity';
import { Category } from 'src/categories/entities/categories.entity';
import { Call } from 'src/calls/entities/calls.entity';
import { Design } from 'src/designs/entities/designs.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'varchar', length: 45, name: 'user_id' })
  @IsString()
  @MaxLength(45)
  @Expose({ name: 'userId' })
  userId: string;

  @Column({ type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  @Expose()
  name: string;

  @Column({ type: 'int', default: null, name: 'default_table_count' })
  @IsInt()
  @Expose({ name: 'defaultTableCount' })
  defaultTableCount: number;

  @Column({ type: 'int', default: null, name: 'total_table_count' })
  @IsInt()
  @Expose({ name: 'totalTableCount' })
  totalTableCount: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsString()
  @MaxLength(45)
  @Expose()
  logo: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsString()
  @MaxLength(45)
  @Expose()
  introduce: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @IsString()
  @MaxLength(45)
  @Expose()
  comment: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  @Expose({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  @Expose({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => RestaurantTable, (table) => table.restaurant)
  @Expose()
  tables: RestaurantTable[];

  @OneToMany(() => Url, (url) => url.restaurant)
  @Expose()
  urls: Url[];

  @OneToMany(() => Order, (order) => order.restaurant)
  @Expose()
  orders: Order[];

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  @Expose()
  menus: Menu[];

  @OneToMany(() => Category, (category) => category.restaurant)
  @Expose()
  category: Category[];

  @OneToMany(() => Call, (call) => call.restaurant)
  @Expose()
  call: Call[];

  @OneToMany(() => Design, (design) => design.restaurant)
  designs: Design[];
}
