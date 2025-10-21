import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//TODO: Validációk megírása
@Entity({ name: 'pantry' })
export class Pantry {
  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinTable()
  user: User;


  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, {
    cascade: true,
  })
  @JoinTable()
  product: Product;

  @Column({
    type: 'int',
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
