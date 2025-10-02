import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

export class UserData {
  user_agent: String
  ip: String
}

@Entity({ name: 'sessions' })
export class Sessions {
  @PrimaryColumn({ type: 'varchar', unique: true })
  session_id: string;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinTable()
  user: User;

  @Column({ type: 'text' })
  user_data: string;

  @Column({ type: 'text' })
  token: string;

  @CreateDateColumn()
  createdAt: Date;
}
