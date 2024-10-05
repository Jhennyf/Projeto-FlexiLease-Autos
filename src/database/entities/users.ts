import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Reserve } from './reserve';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birth: Date;

  @Column()
  cep: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  qualified: boolean;

  @Column()
  neighbordhood: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @OneToMany(() => Reserve, reserve => reserve.user)
  reserves: Reserve[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default User;
