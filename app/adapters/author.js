import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord(store, type, snapshot) {
    const serializer = store.serializerFor(type.modelName);
    const url = this.buildURL(type.modelName, null, snapshot, 'createRecord');
    const data = serializer.serialize(snapshot, {}).data.attributes

    return this.ajax(url, 'POST', {
      data,
      dataType: 'application/x-www-form-urlencoded; charset=UTF-8'
    });
  }
});
