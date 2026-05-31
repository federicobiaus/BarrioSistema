import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('people')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PeopleController {
    constructor(private readonly service: PeopleService) { }

    @Post()
    @Roles(Role.ADMIN, Role.OWNER)
    @UseInterceptors(FileInterceptor('photo')) // 👈 clave para webcam
    create(
        @UploadedFile() file: any,
        @Body() body: any,
        @CurrentUser() user,
    ) {
        console.log('👉 CONTROLLER HIT');
        console.log('BODY:', body);
        console.log('FILE:', file);
        console.log('USER:', user);

        return this.service.create(body, file, user?.id);
    }

    @Get()
    @Roles(Role.ADMIN, Role.OWNER)
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.OWNER)
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.OWNER)
    @UseInterceptors(FileInterceptor('photo'))
    update(
        @Param('id') id: string,
        @UploadedFile() file: any,
        @Body() body: UpdatePersonDto,
        @CurrentUser() user,
    ) {
        return this.service.update(id, body, file, user?.id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.OWNER)
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}