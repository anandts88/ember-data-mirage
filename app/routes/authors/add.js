import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('author');
  },

  actions: {
    willTransition() {
      const model = get(this, 'controller.model');

      if (get(model, 'isNew')) {
        model.deleteRecord();
      }

      this._super(...arguments);
    }
  }
});
