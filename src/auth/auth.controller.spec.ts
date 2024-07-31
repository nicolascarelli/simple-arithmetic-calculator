import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return JWT when credentials are valid', async () => {
    const loginDto = { username: 'test', password: 'test' };
    const mockJwt = { access_token: 'mockJwt', balance: 100 };
    const mockUser = { username: 'test', password: 'test' };

    jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(mockUser);
    jest.spyOn(authService, 'login').mockResolvedValueOnce(mockJwt);

    expect(await authController.login(loginDto)).toBe(mockJwt);
  });

  it('should throw UnauthorizedException when credentials are invalid', async () => {
    const loginDto = { username: 'test', password: 'test' };

    jest.spyOn(authService, 'validateUser').mockImplementation(() => {
      throw new UnauthorizedException();
    });

    await expect(authController.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
