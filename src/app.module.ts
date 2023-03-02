import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UsersEntity } from './api/users/entities/users.entity';
import { CardsModule } from './api/cards/cards.module';
import { OutcomesModule } from './api/outcomes/outcomes.module';
import { CardsEntity } from './api/cards/entities/cards.entity';
import { OutcomesEntity } from './api/outcomes/entities/outcomes.entity';
import { GamesModule } from './api/games/games.module';
import { GamesEntity } from './api/games/entities/games.entity';
import { SequencesEntity } from './api/sequences/entities/sequences.entity';
import { SequencesModule } from './api/sequences/sequences.module';
import { SubsequencesEntity } from './api/sequences/entities/subsequences.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CharactersModule } from './api/characters/characters.module';
import { CharactersEntity } from './api/characters/entities/characters.entity';
import { DecksEntity } from './api/decks/entities/decks.entity';
import { SubdecksEntity } from './api/decks/entities/subdeck.entity';
import { ImagesEntity } from './api/images/entities/images.entity';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});
const DEFAULT_ADMIN = {
  email: 'admin',
  password: 'admin',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [
        UsersEntity,
        CardsEntity,
        OutcomesEntity,
        GamesEntity,
        SubsequencesEntity,
        SequencesEntity,
        CharactersEntity,
        GamesEntity,
        DecksEntity,
        SubdecksEntity,
        ImagesEntity,
      ],
    }),
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            UsersEntity,
            CardsEntity,
            OutcomesEntity,
            GamesEntity,
            SubsequencesEntity,
            SequencesEntity,
            CharactersEntity,
            GamesEntity,
            DecksEntity,
            SubdecksEntity,
            ImagesEntity,
          ],
        },
        auth: {
          authenticate,
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
    ServeStaticModule.forRoot({
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
      serveRoot: '/public/',
      rootPath: join(__dirname, '..', 'public'),
    }),
    PassportModule,
    AuthModule,
    UsersModule,
    CardsModule,
    OutcomesModule,
    GamesModule,
    SequencesModule,
    CharactersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
