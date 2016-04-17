import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'tagit/tests/helpers/ember-test-selectors';
import initializer from "tagit/instance-initializers/ember-i18n";

moduleForComponent('tag-picker', 'Integration | Component | tag picker', {
  integration: true,
  setup() {
    initializer.initialize(this);
  }
});

test('it renders empty', function(assert) {
  this.render(hbs`{{tag-picker}}`);
  this.inject.service('i18n');
  assert.equal(
    this.$(testSelector('empty-message')).text(),
    this.get('i18n').t('tag.list.empty')
  );
  assert.equal(this.$(testSelector('validation-msg')).text(), '');
  assert.notOk(this.$(testSelector('add-input')).hasClass('error'));
});

test('it renders tags', function(assert) {
  let tags = ['ember', 'elixir'];
  this.set('tags', tags);
  this.render(hbs`{{tag-picker tags=tags}}`);
  assert.equal(this.$(testSelector('tags')).length, tags.length);
  assert.equal(this.$(testSelector('tag', 'ember')).text(), 'ember');
  assert.equal(this.$(testSelector('tag', 'elixir')).text(), 'elixir');
});

test('it adds a tag, avoiding dups and normalizing it', function(assert) {
  let tags = [];
  this.set('tags', tags);
  this.render(hbs`{{tag-picker tags=tags}}`);
  assert.equal(this.$(testSelector('tags')).length, 0);
  this.$(testSelector('add-input')).val('emberData_1').trigger('input');
  this.$(testSelector('add-btn')).click();
  this.$(testSelector('add-input')).val('elixir').trigger('input');
  this.$(testSelector('add-btn')).click();
  this.$(testSelector('add-input')).val('elixir').trigger('input');
  this.$(testSelector('add-btn')).click();
  assert.equal(this.$(testSelector('tags')).length, 2);
  assert.equal(this.$(testSelector('tag', 'ember-data-1')).text(), 'ember-data-1');
  assert.equal(this.$(testSelector('tag', 'elixir')).text(), 'elixir');
});

test('it removes a tag', function(assert) {
  let tags = ['ember'];
  this.set('tags', tags);
  this.render(hbs`{{tag-picker tags=tags}}`);
  assert.equal(this.$(testSelector('tags')).length, 1);
  this.$(testSelector('remove', 'ember')).click();
  assert.equal(this.$(testSelector('tags')).length, 0);
});

test('it shows invalid if empty string', function(assert) {
  this.set('tags', []);
  this.render(hbs`{{tag-picker tags=tags}}`);
  this.$(testSelector('add-input')).val('').trigger('input');
  this.$(testSelector('add-btn')).click();
  assert.equal(
    this.$(testSelector('validation-msg')).text().trim(),
    "This field can't be blank"
  );
  assert.ok(this.$(testSelector('add-input')).hasClass('error'));
  assert.equal(this.$(testSelector('tags')).length, 0);
});

test('it shows invalid if string too long', function(assert) {
  this.set('tags', []);
  this.render(hbs`{{tag-picker tags=tags}}`);
  let longStr = new Array(50).join("a");
  this.$(testSelector('add-input')).val(longStr).trigger('input');
  this.$(testSelector('add-btn')).click();
  assert.equal(
    this.$(testSelector('validation-msg')).text().trim(),
    'This field is too long (maximum is 25 characters)'
  );
});