import { LocalAuthGuard } from './local-auth-guard.service';

describe('GuardsGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
