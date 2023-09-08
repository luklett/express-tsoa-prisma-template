import { Get, Route, Tags } from 'tsoa';

@Tags('Default')
@Route()
export class DefaultController {
  @Get()
  get(): string {
    return 'hello world';
  }
}
