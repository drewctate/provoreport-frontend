import { DecodeHtmlString } from './decode-html-string.pipe';

describe('DecodeHtmlStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DecodeHtmlString();
    expect(pipe).toBeTruthy();
  });
});
