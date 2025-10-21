import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pantry' })
export class Pantry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, {
    cascade: true,
  })
  @JoinTable()
  product: Product;

  @Column({
    type: 'number',
    default: 1,
  })
  amount: number;

  @Column({
    type: 'date',
    default: () => "CURRENT_DATE + INTERVAL '1 week'",
  })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
