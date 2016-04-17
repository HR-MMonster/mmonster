describe('Profile Editing', function() {
  beforeEach(function() {
    browser.get('http://localhost:8000/pages/playerSignin.html');
    element(by.id('username')).sendKeys('travis');
    element(by.id('password')).sendKeys('test');
    element(by.id('sign-in')).click();
  });

  it('should change name when saved', function(done) {
    setTimeout(function() {
      browser.get('http://localhost:8000/pages/userprofile_edit.html');
      element(by.model('ProfileCtrl.profile.name')).clear().sendKeys('travis-sama');
      element(by.id('user-update')).click();
      setTimeout(function() {
        browser.get('http://localhost:8000/pages/userprofile_public.html');
        setTimeout(function() {
          element(by.id('name')).getText().then(function(name) {
            expect(name).toEqual('travis-sama');
            done();
          });
        }, 2000);
      }, 2000);
    }, 2000);
  });
});
