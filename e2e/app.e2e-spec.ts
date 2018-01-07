import { FacebookComponentPage } from './app.po';

describe('facebook-component App', () => {
  let page: FacebookComponentPage;

  beforeEach(() => {
    page = new FacebookComponentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
