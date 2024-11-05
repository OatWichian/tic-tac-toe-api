import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/apikey.guard';
import { AuthFrontIgnEmployeeIdGuard } from 'src/auth/auth-front-ign-employee-id.guard';
import { Claims } from 'src/helpers/decorators/claims.decorator';
import { IClaims } from 'src/helpers/interface/claims.interface';
import RouterConfig from 'src/routes/router.config';
import { CreateRegisterDto } from './dto/create-register.dto';
import { RegisterService } from './register.service';

@UseGuards(ApiKeyGuard, AuthFrontIgnEmployeeIdGuard)
@Controller(RouterConfig.api.authenticate.register)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto, @Claims() claims: IClaims) {
    return this.registerService.create(createRegisterDto, claims);
  }
}
