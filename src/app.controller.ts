import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	root(@Res() res) {
		res.sendFile(process.cwd() + '/src/index.html');
	}
}
