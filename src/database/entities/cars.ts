import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Reserve } from './reserve';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  year: number;

  @Column()
  valuePerDay: number;

  @Column()
  numberOfPassengers: number;

  @OneToMany(() => Reserve, reserve => reserve.car)
  reserves: Reserve[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
