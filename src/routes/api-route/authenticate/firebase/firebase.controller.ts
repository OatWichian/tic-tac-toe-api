import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/apikey.guard';
import RouterConfig from 'src/routes/router.config';
import { FirebaseDto } from './dto/firebase.dto';
import { FirebaseService } from './firebase.service';
import { FirebaseLinkEmailDto } from './dto/firebase-link-email.dto';

@UseGuards(ApiKeyGuard)
@Controller(RouterConfig.api.authenticate.firebase)
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('sign-up')
  signup(@Body() firebaseDto: FirebaseDto) {
    return this.firebaseService.firebaseSignup(firebaseDto);
  }

  @Post('sign-in')
  signIn(@Body() firebaseDto: FirebaseDto) {
    return this.firebaseService.firebaseSignIn(firebaseDto);
  }

  @Post('link-email')
  linkEmail(@Body() firebaseDto: FirebaseLinkEmailDto) {
    return this.firebaseService.linkEmail(firebaseDto);
  }
}
