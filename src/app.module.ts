import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TestController } from './test/controller/test.controller';
import { TestService } from './test/service/test.service';
import { TaskModule } from './test/modules/taskModule';

@Module({
  imports: [
    ProductModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION') as 'postgres',
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://jovakinn:root@cluster0.endkw.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    TaskModule,
  ],
  controllers: [AppController, TestController],
  providers: [AppService, TestService],
})
export class AppModule {}
