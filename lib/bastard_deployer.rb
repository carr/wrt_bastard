require 'rubygems'
require 'rake'
require 'fileutils'
require 'json' # gem install json --version=1.4.3

# gem install rubyzip --version=0.9.4
gem 'rubyzip'
require 'zip/zip'
require 'zip/zipfilesystem'

class BastardDeployer
  DEVICE_CACHE_PATH = 'wrt_bastard/.device_cache'
  
  def initialize
    load_devices
    save_devices_to_cache
    @archive = File.join(File.basename(Dir.pwd)) + '_release.wgz'
    @excludes = [
      '.git',
      '.gitmodules',
      '*.wgz',
      'deploy',
      'wrt_bastard/*.markdown',
      'wrt_bastard/deploy',
      'wrt_bastard/lib/*',
      'wrt_bastard/preview',
      'wrt_bastard/emulator',
      '.zip',
      'app/*'
    ]

    @deploy_to = 'deploy'
    @deploy_tmp = File.join(@deploy_to, 'tmp')
    @environment = 'production'
  end
  
  def load_devices
    load_devices_from_command_line
    load_devices_from_cache if @devices.size == 0
  end
  
  def load_devices_from_command_line
    @devices = []
    if ARGV.size > 0
      ARGV.each do |device|
        if device.size < 12
          raise "Device address #{device} too small"
        elsif device.size == 12
          # convert abcdefghijkl to ab:cd:ef:gh:ij:kl
          device = device.scan(/.{2}/).join(":")
        end
        @devices << device
      end
    end
    @devices
  end
  
  def load_devices_from_cache
    @devices = File.readlines(DEVICE_CACHE_PATH).map{|x| x.strip}
  end
  
  def save_devices_to_cache
    if @devices
      File.open(DEVICE_CACHE_PATH, 'w+') do |f|
        @devices.each do |device|
          f.puts device
        end
      end
    end
  end

  def build
    FileUtils.rm_r @deploy_to, :force=>true

    FileUtils.mkdir_p @deploy_to
    FileUtils.mkdir_p @deploy_tmp

    list = FileList['**/*']

    @excludes.each do |exclude|
      list = list.exclude(exclude)
    end

    list.each do |filename|
      #puts filename
      dirname = File.dirname(filename)
      destination_dir = File.join(@deploy_tmp, dirname)
      FileUtils.mkdir_p destination_dir

      #puts dirname
      unless File.directory?(filename)
        FileUtils.cp_r filename, destination_dir
      end
    end

    bundle_assets

    change_environment

    create_wgz

    FileUtils.rm_r @deploy_to, :force=>true    
  end

  def deploy
    build
    
    @devices.each do |device|
      puts "Sending via bluetooth to #{device}"
      system "bluetooth-sendto --device #{device} #{@archive}"
    end    
  end

  def bundle_assets
    puts "Bundling assets"
    str = File.read('config/dependencies.js').gsub('var config = ', '')
    assets = JSON.parse(str)

    join_files(assets['javascripts'], '.js')
    join_files(assets['stylesheets'], '.css')
  end

  def join_files(files, extension)
    str = files.inject("") do |memo, file|
      memo << File.read(file['path'] + file['filename'] + extension) << "\n"
    end

    output_dir = case extension
      when '.js'
        File.join(@deploy_tmp, 'app', 'javascripts')
      when '.css'
        File.join(@deploy_tmp, 'app', 'stylesheets')
    end

    FileUtils.mkdir_p output_dir
    file_tmp = File.join(output_dir, "bundle_tmp#{extension}")
    file = File.join(output_dir, "bundle#{extension}")
    File.open(file_tmp, 'w+'){|f| f.puts(str)}
    `java -jar #{File.join("wrt_bastard", "lib", "yuicompressor.jar")} #{file_tmp} > #{file}`
    FileUtils.rm_f file_tmp
  end

  def change_environment
    "Changing environment to #{@environment}"
    File.open(File.join(@deploy_tmp, 'config', 'environment.js'), 'w+') do |f|
      f.puts "var ENV='#{@environment}'"
    end
  end

  def create_wgz
    path = @deploy_tmp
    path.sub!(%r[/$],'')
    FileUtils.rm_rf @archive

    Zip::ZipFile.open(@archive, 'w') do |zipfile|
      Dir["#{path}/**/**"].each do |file|
        entry = "#{File.basename(Dir.pwd)}/" + file.sub(path + '/', "")
        puts "Adding to .wgz: #{entry}"
        zipfile.add(entry, file)
      end
    end
  end
end
