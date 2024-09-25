import { IsString, MaxLength } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  restaurant_id: string;

  @Column({ type: 'varchar', length: 45 })
  @IsString()
  @MaxLength(45)
  category_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
