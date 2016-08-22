import Ember from 'ember';
import DS from 'ember-data';

const {
  String: { camelize }
} = Ember;

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return camelize(attr);
  },

  normalizeAuthor({ id, firstName, lastName }, type) {
    return {
      id,
      type,
      attributes: { firstName, lastName }
    };
  },

  normalizeFindAllResponse() {
    const type = arguments[1];
    const payload = arguments[2];
    const _payload = {};
    let { authors=[] } = payload;
    let _author;

    authors = authors.map((author) => {
      _author = this.normalizeAuthor(author, type.modelName);
      _author.links = { self: `/authors/${_author.id}` };
      return _author;
    });

    _payload.links = { self: '/authors' };
    _payload.data = authors;

    return _payload;
  },

  normalizeFindRecordResponse() {
    const type = arguments[1];
    const payload = arguments[2];
    const _payload = {};
    let { author={} } = payload;

    author = this.normalizeAuthor(author, type.modelName);

    _payload.links = { self: `/authors/${author.id}` };
    _payload.data = author;

    return _payload;
  },

  normalizeSaveResponse() {
    const type = arguments[1];
    const payload = arguments[2];
    const _payload = {};
    let { author={} } = payload;

    author = this.normalizeAuthor(author, type.modelName);

    _payload.links = { self: `/authors/${author.id}` };
    _payload.data = author;

    return _payload;
  }
});
