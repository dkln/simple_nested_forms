var SimpleNestedForms = {
  applyDisableSaveButtonBehaviour: function() {
    $('form').submit(function(event) {
      $(this).find('button[type=submit]').attr('disabled', true);
    });
  },

  generatedId: function() {
    return String(new Date().getTime());
  },

  applyAddFieldsBehaviour: function() {
    var self = this;
    $('.add_fields[data-content]').each(self._applyAddFieldBehaviour);
  },

  applyDestroyFieldsBehaviour: function() {
    var self = this;
    $('.destroy_fields').each(self._applyDestroyFieldBehaviour);
  },

  _applyAddFieldBehaviour: function() {
    var element = $(this);

    if(!element[0].hasAddFieldsBehaviour) {
      element[0].hasAddFieldsBehaviour = true;
      element.click(SimpleNestedForms._handleAddClick);
    }
  },

  _applyDestroyFieldBehaviour: function() {
    var element = $(this);

    if(!element.hasDestroyFieldsBehaviour) {
      element.hasDestroyFieldsBehaviour = true;
      element.click(SimpleNestedForms._handleDestroyClick);
    }
  },

  _handleAddClick: function(event) {
    event.preventDefault();

    var button = $(event.currentTarget);
    var nav = button.closest('nav')

    nav.before(SimpleNestedForms._htmlForNewRecord(button));

    SimpleNestedForms.applyDestroyFieldsBehaviour();
    SimpleNestedForms.applyAddFieldsBehaviour();

    if(SimpleNestedForms.onAddItem)
      SimpleNestedForms.onAddItem();

    return false;
  },

  _htmlForNewRecord: function(addButton) {
    html = addButton.attr('data-content');
    html = html.replace(/_new_/g, '_' + SimpleNestedForms.generatedId() + '_');
    html = html.replace(/\[new\]/g, '[' + SimpleNestedForms.generatedId() + ']');

    return html;
  },

  _handleDestroyClick: function(event) {
    event.preventDefault();

    var button = $(event.currentTarget);
    var form = button.closest('form');
    var fieldset = button.closest('fieldset');
    var idField = fieldset.next('input[type=hidden]');

    form.append('<input type="hidden" name="' + button.attr('data-id') + '[_destroy]" value="1">');
    fieldset.remove();

    return false;
  }
};

$(function() {
  SimpleNestedForms.applyDisableSaveButtonBehaviour();
  SimpleNestedForms.applyAddFieldsBehaviour();
  SimpleNestedForms.applyDestroyFieldsBehaviour();
});