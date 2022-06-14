import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id?: number;

  @Field()
  @CreateDateColumn()
  public createdAt: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Field()
  @Column({ unique: true })
  public email: string;

  @Field({ nullable: true })
  @Column({ nullable: false })
  public name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public password: string;
  isTwoFactorAuthenticationEnabled: boolean;
}
