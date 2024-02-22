import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.seller, { cascade: true })
  products: Product[];

  @OneToMany(() => Order, (order) => order.buyer, { cascade: true })
  buyerOrders: Order[];

  @OneToMany(() => Order, (order) => order.seller, { cascade: true })
  sellerOrders: Order[];

  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }
}
