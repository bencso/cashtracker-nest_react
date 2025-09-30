import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class Sessions {
  @PrimaryColumn({ type: 'varchar', unique: true })
  token: string;

  @Column({ type: 'varchar' })
  ip: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinTable()
  user: User;

  @Column({ type: 'text' })
  user_agent: string;

  @CreateDateColumn()
  createdAt: Date;
}
