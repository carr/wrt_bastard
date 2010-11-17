#!/usr/bin/env ruby
require "rubygems"
require "bundler/setup"
require "sinatra"

$LOAD_PATH.unshift(File.join(File.expand_path(File.dirname(__FILE__)), 'lib'))
require 'template_handler'

set :public, File.join(File.expand_path(File.dirname(__FILE__)), '..')

puts "Go to http://localhost:{port}/wrt_bastard/emulator.html"

get '/app.html' do
  # rebuild sass files
  `cd sass && compass compile && cd ..`
  
  # add templates
  templates = TemplateHandler.get_templates()
  
  str = File.read('index.html')
  str.gsub!('<head>', '<head><script type="text/javascript" src="wrt_bastard/preview/script/lib/loader.js"></script>')
  str.gsub!('</body>', templates)
  str
end