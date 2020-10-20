import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';
import Provider from './Provider';
import Drawing from './Drawing';

@Entity('orders')
class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_user: string;

  @Column()
  id_provider: string;

  @Column()
  id_drawing: string;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'id_provider' })
  provider: Provider;

  @ManyToOne(() => Drawing)
  @JoinColumn({ name: 'id_drawing' })
  drawing: Drawing;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Orders;
