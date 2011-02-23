module SimpleNestedForms

  def nested_fields_for(form, association, text_new_record, &block)
    field_html = form.simple_fields_for(association, &block)
    new_html = form.simple_fields_for(association, new_association_object(form, association), :child_index => 'new', &block)

    (field_html + nav_for_new_record(text_new_record, new_html)).html_safe
  end

  def nav_for_new_record(text, html_for_add)
    "<nav class='new'><ol><li>#{link_to(text, '#', :"data-content" => "#{html_for_add}", :class => 'add_fields add')}</li></ol></nav>".html_safe
  end

  def nav_for_existing_record(text, form)
    "<nav class='existing'><ol><li>#{link_to(text, '#', :class => 'destroy_fields destroy', :"data-id" => form.object_name)}</li></ol></nav>".html_safe
  end

  def new_association_object(form, association)
    form.object.class.reflect_on_association(association).klass.new
  end

end

