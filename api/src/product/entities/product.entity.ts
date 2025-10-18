import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'prorduct' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'text', nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  product_name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  brands: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  quantity: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  categories: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  serving_size: string;

  @Column({ type: 'float', nullable: true })
  energy_kcal_100g: number;

  @Column({ type: 'float', nullable: true })
  fat_100g: number;

  @Column({ type: 'float', nullable: true })
  saturated_fat_100g: number;

  @Column({ type: 'float', nullable: true })
  carbohydrates_100g: number;

  @Column({ type: 'float', nullable: true })
  sugars_100g: number;

  @Column({ type: 'float', nullable: true })
  fiber_100g: number;

  @Column({ type: 'float', nullable: true })
  proteins_100g: number;

  @Column({ type: 'float', nullable: true })
  salt_100g: number;

  @Column({ type: 'varchar', nullable: true })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  ingredients_text: string;
}
