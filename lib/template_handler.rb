class TemplateHandler
  def self.get_templates
    Dir['app/templates/*.html'].inject('') do |memo, file|
      basename = File.basename(file, '.html')
      memo << "<script type='text/html' id='#{basename}'>"
      memo << "\n"
      memo << File.read(file) 
      memo << "</script>\n"
      memo
    end    
  end
end