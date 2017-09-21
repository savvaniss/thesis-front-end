import { FrontEndThesisPage } from './app.po';

describe('front-end-thesis App', () => {
  let page: FrontEndThesisPage;

  beforeEach(() => {
    page = new FrontEndThesisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
