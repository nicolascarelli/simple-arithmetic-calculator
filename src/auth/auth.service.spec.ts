import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserStatus } from '../enums/user-status.enum';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a user when credentials are valid', async () => {
    const mockUser = new User();
    mockUser.username = 'test';
    mockUser.password = await bcrypt.hash('test', 10);
    mockUser.status = UserStatus.ACTIVE;
    mockUser.balance = Number(process.env.DEFAULT_BALANCE || 0);

    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);

    expect(await authService.validateUser('test', 'test')).toEqual(mockUser);
  });

  it('should throw an error when the user does not exist', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(null);

    await expect(authService.validateUser('test', 'test')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw an error when the user is inactive', async () => {
    const mockUser = new User();
    mockUser.username = 'test';
    mockUser.password = await bcrypt.hash('test', 10);
    mockUser.status = UserStatus.INACTIVE;
    mockUser.balance = Number(process.env.DEFAULT_BALANCE || 0);

    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);

    await expect(authService.validateUser('test', 'test')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw an error when the password is incorrect', async () => {
    const mockUser = new User();
    mockUser.username = 'test';
    mockUser.password = await bcrypt.hash('wrong', 10);
    mockUser.status = UserStatus.ACTIVE;
    mockUser.balance = Number(process.env.DEFAULT_BALANCE || 0);

    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(mockUser);

    await expect(authService.validateUser('test', 'test')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
