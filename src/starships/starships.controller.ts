import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth.guard';
import { StarshipsBodyDto } from './starships-body.dto';
import { StarshipsService } from './starships.service';

@Controller('starships')
@UseGuards(AuthGuard)
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  getAll(@Body() body: StarshipsBodyDto) {
    return this.starshipsService.getAll(body);
  }
}
