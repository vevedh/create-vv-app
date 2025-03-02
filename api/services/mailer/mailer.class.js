import { Service } from 'feathers-mailer';

export class Mailer extends Service {
  constructor(transport, defaults) {
    super(transport, defaults);
  }
}
