module ApplicationHelper
  def page_id
    if id = content_for(:body_id) and id.present?
      return id.strip
    else
      base = controller.class.to_s.gsub("Controller", '').underscore.gsub("/", '_')
      return "#{base}-#{controller.action_name}"
    end
  end

  def page_classes(classes="")
    page_class = content_for(:page_class) ? content_for(:page_class) : ""
    controller.class.to_s.gsub("Controller", '').underscore.gsub("/", '_')+
    " "+controller.action_name+
    " "+page_class+
    " "+classes
  end
end
