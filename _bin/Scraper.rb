require 'HTTParty'
require 'Nokogiri'
require 'webdrivers'
require 'watir'
require 'open-uri'
require 'pry'
require 'active_support'
require 'active_support/core_ext'
require_relative 'Looper'


class Scraper

	attr_accessor :parse_page, :url
	def initialize(url)
		doc = HTTParty.get(url)
		@parse_page ||= Nokogiri::HTML(doc)
	end

  def download_image(url, file_name)

    image_directory = "/_assets/images/"

    open(url) do |u|
      File.open(File.join(File.expand_path("..", Dir.pwd), image_directory, file_name), 'wb') { |f| f.write(u.read) }
    end

    return image_directory.tr('_', '') + file_name
  end

  def new_file_name(file, sku, index)
    file, extension = file.split('.')
    index = sprintf '%02d', index

    return sku + '_' + index.to_s + '.' + extension
  end

  def get_pro_res_file(url)
    path = url.gsub(url.split('/').last, "")
    file = url.split('/').last.split('_').first
    
    return path + file
  end

	def get_name
    parse_page.css(".product-name").children.first.content
		#parse_page.css(".product-name").children.map { |name| name.text }.compact
	end

  def get_price
    parse_page.css(".p-price").children.first.content
    #parse_page.css(".p-price").children.map { |name| name.text }.compact
  end

  # def get_description(url)
  #   # description_element = parse_page.css(".description-content")
  #   browser = Watir::Browser.new
  #   browser.goto(url)
  #   browser.element(css: ".description-content").wait_until_present
  #   js_rendered_content = browser.element(css: ".description-content")

  #   js_rendered_content.text
  # end

  def get_shipping(url)
    browser = Watir::Browser.new
    browser.goto(url)
    browser.element(css: ".logistics-cost").wait_until
    js_rendered_content = browser.element(css: ".logistics-cost").text
    browser.close

    return js_rendered_content
  end

  def get_options(sku)

    #
    # => Understanding get_options Delimeter:
    # =>    Each option will be separated by ','
    # =>    The title of the option will be separated by '|'
    # =>    The list values of the option will be separated by ';'
    #
    # => Example:
    # =>    title1|option1;option2;option3,
    # =>    title2|option1;option2;option3
    #

    option_list = parse_page.css("#j-product-info-sku").children
    list = {}

    option_list.each do |item|
      next if !item.text.gsub(/\s+/, '').present?

      option_name = item.text.gsub(/\s+/, '').split(':')[0]
      children_list ||= []
      
      item.css('li a').each_with_index do |child, index|

        if child.css("img").present?
          title = child.try { |p| p["title"] }
          image = child.css("img").first.try { |p| p["src"] }
          image_file_name = image.split('/').last.split('_').first

          saved_image = download_image(get_pro_res_file(image), new_file_name(image_file_name, sku, index))

          children_list << { title: title, image: saved_image }
        else
          children_list << { title: child.children.try { |p| p.first.text } }
        end
      end
      list[option_name] = children_list 
    end
    return list
  end

  def get_option_types(list)
    optionKeyNames = list.keys
    options ||= []

    optionKeyNames.each do |key|
      optionTypeNames = list[key].map {|x| x.keys }.uniq[0]
      if optionTypeNames.include?(:title)
        children = list[key].map {|item| item[:title] }.join(";")
        options << children.prepend(key + "|")
      end
    end
    if options.empty?
      return ""
    else
      return options.join(',')
    end
  end

  def get_images(list)
    optionKeyNames = list.keys
    images ||= []

    optionKeyNames.each do |key|
      optionTypeNames = list[key].map {|x| x.keys }.uniq[0]
      if optionTypeNames.include?(:image)
        images << list[key].map {|item| item[:image] }.join(",")
      end
    end

    if images.empty?
      return ""
    else
      return images.join(',')
    end
  end

  def get_specifications
    spec_list = parse_page.css(".product-property-list").children
    list ||= []
    spec_list.each do |item|
      next if !item.text.gsub(/\s+/, '').present?

      list << item.text.gsub(/\s+/, '')
    end

    list.map {|s| s.gsub(":", "=")}.join('|')
  end

  def writeFile(sku, name, price, specs, options, images, shipping)
    name = name.split(' ').join('-')

    file = File.new(File.join(File.expand_path("..", Dir.pwd), "/_products", name + ".html"), 'wb')

    file.puts("---")

    file.puts("layout: productDetails")
    file.puts("sku: " + sku.to_s)
    file.puts("name: " + name.to_s)
    file.puts("description: ")
    file.puts("price: " + price.to_s)
    file.puts("specifications: " + specs.to_s)
    file.puts("options: " + options.to_s)
    file.puts("images: " + images.to_s)
    file.puts("shipping: " + shipping.to_s)

    file.puts("---")

    file.close

  end

  # def get_tags

  # end

  # def get_genericimages

  # end

  private

  looper = Looper.new

  urls = looper.get_urls
  urls.each do |u|
    scraper = Scraper.new(u)
    productSku = SecureRandom.hex(10)
    optionsList = scraper.get_options(productSku)


    productName = scraper.get_name
    productPrice = scraper.get_price
    # productDescription = scraper.get_description(u)
    productSpecifications = scraper.get_specifications
    productOptions = scraper.get_option_types(optionsList)
    productImages = scraper.get_images(optionsList)
    productShipping = scraper.get_shipping(u)


    scraper.writeFile(productSku, productName, productPrice, productSpecifications, productOptions, productImages, productShipping)

    puts "DONE!"

  end
end

