import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { RolePermission } from './role.permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string; // user role enum values

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.seller, { cascade: true })
  products: Product[];

  @OneToMany(() => Order, (order) => order.buyer, { cascade: true })
  buyerOrders: Order[];

  @OneToMany(() => Order, (order) => order.seller, { cascade: true })
  sellerOrders: Order[];

  @ManyToMany(() => RolePermission, (rolePermission) => rolePermission.users)
  permissions: RolePermission[];

  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }
}
