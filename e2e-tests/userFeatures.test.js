const path = require('path');
const { userDetails } = require('./mockData');

module.exports = {
  "Users can signup and logout": (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .click('a.btn.btn-outline-danger.btn-lg')
      .setValue('input[name=username]', userDetails.username)
      .setValue('input[name=fullName]', userDetails.fullName)
      .setValue('input[name=email]', userDetails.email)
      .setValue('input[name=password]', userDetails.password)
      .setValue('input[name=cpassword]', userDetails.cpassword)
      .click('button.btn.btn-outline-danger.btn-lg.btn-block')
      .waitForElementVisible('#dropdownMenu2', 5000)
      .click('#dropdownMenu2')
      .click('#logout');
  },

  'user receives an error if required fields for signup are empty':
   (browser) => {
     browser
       .url('http://localhost:8000/signup')
       .waitForElementVisible('#signup-form', 5000)
       .setValue('input[name=username]', '    ')
       .setValue('input[name=fullName]', '    ')
       .setValue('input[name=email]', 'ruqqy@gmail.com')
       .setValue('input[name=password]', 'joyce123')
       .setValue('input[name=cpassword]', 'joyce123')
       .click('button.btn.btn-outline-danger.btn-lg.btn-block')
       .waitForElementVisible('.toast-message', 5000)
       .assert.containsText('.toast-message', 'All field are required')
       .pause(2000)
       .waitForElementVisible('.toast-message', 5000);
   },

  'user cannot sign up with taken username': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('#signup-form', 5000)
      .setValue('input[name="username"]', userDetails.username)
      .setValue('input[name="fullName"]', 'bunmi john')
      .waitForElementVisible('#username-invalid', 5000)
      .assert.containsText('#username-invalid', 'Username already exist');
  },

  'user cannot sign up with taken email': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('#signup-form', 5000)
      .setValue('input[name="email"]', userDetails.email)
      .setValue('input[name="password"]', 'joycee123')
      .waitForElementVisible('#email-invalid', 5000)
      .assert.containsText('#email-invalid', 'Email already exist');
  },

  'user cannot log in with invalid details': (browser) => {
    browser
      .url('http://localhost:8000/login')
      .waitForElementVisible('#login-form', 5000)
      .setValue('input[name=username]', 'wrongusername')
      .setValue('input[name=password]', 'wrongpassword')
      .click('button.btn.btn-outline-success.btn-lg.btn-block')
      .assert.containsText('#invalid-credential', 'Invalid Credentials');
  },

  "Users can login": (browser) => {
    browser
      .url('http://localhost:8000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userDetails.username)
      .setValue('input[name=password]', userDetails.password)
      .click('button.btn.btn-outline-success.btn-lg.btn-block')
      .waitForElementVisible('.toast-message', 5000);
  },

  'user receives an error if required fields for add recipe are empty':
    (browser) => {
      browser
        .url('http://localhost:8000/add-recipe')
        .waitForElementVisible('#add-form', 5000)
        .setValue('input[name=recipeName]', ' ')
        .setValue('textarea[name=ingredient]', ' ')
        .setValue('textarea[name=details]', ' ')
        .click('#add-it')
        .assert.containsText('.toast-message', 'All field are required')
        .waitForElementVisible('.toast-message', 5000);
    },

  "Users can add recipe": (browser) => {
    browser
      .url('http://localhost:8000/recipes')
      .waitForElementVisible('#add-recipe', 5000)
      .click('#add-recipe')
      .setValue('input[name=recipeName]', 'Chin chin')
      .setValue('textarea[name=ingredient]', 'flour and water')
      .setValue('textarea[name=details]', 'bake the chin chin')
      .setValue('#exampleInputFile',
        path.resolve('../../Downloads/chin-chin.jpg'))
      .click('#add-it')
      .waitForElementVisible('.toast-message', 50000);
  },

  'user cannot add recipe with the same recipe name': (browser) => {
    browser
      .url('http://localhost:8000/add-recipe')
      .waitForElementVisible('#add-form', 5000)
      .setValue('input[name=recipeName]', 'Chin chin')
      .setValue('textarea[name=ingredient]', 'flour and water')
      .setValue('textarea[name=details]', 'bake the chin chin')
      .setValue('#exampleInputFile',
        path.resolve('../../Downloads/chin-chin.jpg'))
      .click('#add-it')
      .waitForElementVisible('.toast-message', 50000)
      .assert.containsText('.toast-message', 'You have already created recipe');
  },

  "Users can search recipe": (browser) => {
    browser
      .url('http://localhost:8000/recipes')
      .waitForElementVisible('.form-control.mr-sm-2', 5000)
      .setValue('input[type=text]', 'Chin chin');
  },

  "Users can favorite recipe": (browser) => {
    browser
      .url('http://localhost:8000/recipes')
      .waitForElementVisible('#favorite', 5000)
      .click('#favorite')
      .waitForElementVisible('.toast-message', 5000);
  },

  "Users can view recipe": (browser) => {
    browser
      .url('http://localhost:8000/recipes')
      .click('#read-more')
      .waitForElementVisible('#recipe-name', 5000)
      .assert.containsText('#recipe-name', 'Chin Chin')
      .assert.containsText('h4.ingredients', 'Ingredients')
      .assert.containsText('#input-ingredients', 'flour and water')
      .assert.containsText('h4.details', 'Cooking Direction')
      .assert.containsText('#input-details', 'bake the chin chin')
      .assert.containsText('button.review', 'Post Review');
    browser.expect.element('img.img-thumbnail')
      .to.have.attribute('src', 'http://res.cloudinary.com/ruqoyah/image/upload/c_fill,h_200,w_302/sckzvzjpxachzod9vdq2');
  },

  "Users can view favorite recipe page": (browser) => {
    browser
      .url('http://localhost:8000/favorite-recipe')
      .waitForElementVisible('body', 5000)
      .assert.containsText('h4.card-title', 'Chin Chin')
      .assert.containsText('p.card-text', 'bake the chin chin')
      .assert.containsText('#read-more', 'Read more')
      .assert.containsText('small.text-muted', 'Recipe by ruqoyah');
    browser.expect.element('img.card-img-top')
      .to.have.attribute('src', 'http://res.cloudinary.com/ruqoyah/image/upload/c_fill,h_200,w_302/sckzvzjpxachzod9vdq2');
  },

  "Users can view and edit profile and logout": (browser) => {
    browser
      .url('http://localhost:8000/profile')
      .waitForElementVisible('body', 5000)
      .assert.containsText('#profile-button', 'Profile')
      .assert.containsText('#edit-profile', 'Edit')
      .assert.containsText('#username', 'ruqoyah')
      .assert.containsText('#fullName', 'Rukayat Odukoya')
      .assert.containsText('#email', 'rukayat@gmail.com');
    browser.expect.element('img')
      .to.have.attribute('src', '/images/picture.png');
    browser.waitForElementVisible('#edit-profile', 5000);
    browser.click('#edit-profile');
    browser.waitForElementVisible('#profile-username', 5000);
    browser.clearValue('input[name=username]');
    browser.setValue('input[name=username]', userDetails.editedUsername);
    browser.click('#save-changes');
    browser.waitForElementVisible('.toast-message', 5000)
      .waitForElementVisible('#dropdownMenu2', 5000)
      .click('#dropdownMenu2')
      .click('#logout');
  },

  "Users can signup and upvote and downvote recipe": (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', 'johnny')
      .setValue('input[name=fullName]', 'john josh')
      .setValue('input[name=email]', 'josh@gmail.com')
      .setValue('input[name=password]', 'johnny123')
      .setValue('input[name=cpassword]', 'johnny123')
      .click('button.btn.btn-outline-danger.btn-lg.btn-block')
      .waitForElementVisible('.fa.fa-thumbs-up', 5000)
      .click('.fa.fa-thumbs-up')
      .waitForElementVisible('.fa.fa-thumbs-down', 5000)
      .click('.fa.fa-thumbs-down')
      .click('#dropdownMenu2')
      .click('#logout');
  },

  "Users can edit and delete recipe": (browser) => {
    browser
      .url('http://localhost:8000/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=username]', userDetails.editedUsername)
      .setValue('input[name=password]', userDetails.password)
      .click('button.btn.btn-outline-success.btn-lg.btn-block')
      .waitForElementVisible('#dropdownMenu2', 5000)
      .click('#dropdownMenu2')
      .waitForElementVisible('#my-recipe', 5000)
      .click('#my-recipe')
      .waitForElementVisible('#edit', 5000)
      .click('#edit')
      .clearValue('textarea[name=details]')
      .setValue('textarea[name=details]', 'Bake the chin chin the right way')
      .click('#submit-edit')
      .waitForElementVisible('#delete-recipe', 5000)
      .click('#delete-recipe')
      .waitForElementVisible('.swal-button--confirm.swal-button--danger', 5000)
      .click('.swal-button--confirm.swal-button--danger')
      .waitForElementVisible('.swal-button--confirm', 5000)
      .click('.swal-button--confirm')
      .end();
  }

};
