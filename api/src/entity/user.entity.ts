import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('boolean', { default: true })
  active: boolean;
}
