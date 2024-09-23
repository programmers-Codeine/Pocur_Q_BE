import { IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  restaurant_id: string;

  @Column()
  category_name: string;
}
