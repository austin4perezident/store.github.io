require 'HTTParty'
require 'Nokogiri'
require 'webdrivers'
require 'watir'
require 'open-uri'
require 'pry'
require 'active_support'
require 'active_support/core_ext'
require_relative 'Looper'
#require 'Open_uri'


class Scraper

	attr_accessor :parse_page, :url
	def initialize(url)
		doc = HTTParty.get(url)
		@parse_page ||= Nokogiri::HTML(doc)
	end

  def download_image(url, dest)
    open(url) do |u|
      File.open(dest, 'wb') { |f| f.write(u.read) }
    end
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
    browser.element(css: ".logistics-cost").wait_until_present
    js_rendered_content = browser.element(css: ".logistics-cost")

    js_rendered_content.text
    browser.close
  end

  def get_options
    option_list = parse_page.css("#j-product-info-sku").children
    list ||= []
    children_list ||= []

    option_list.each do |item|
      next if !item.text.gsub(/\s+/, '').present?

      list << item.text.gsub(/\s+/, '').split(':')[0]
      
      item.css('li a').each do |child|
        children_list << { title: child.try { |p| p["title"] }, image: child.css("img").first.try { |p| p["src"] } }
      end
    end

    list.concat(children_list)
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

  # def get_tags

  # end

  # def get_genericimages

  # end

  private

  # def item_container
  # 	parse_page.css(".grid-item-info")
  # end

  looper = Looper.new

  urls = looper.get_urls
  urls.each do |u|
    scraper = Scraper.new(u)
    productName = scraper.get_name
    productPrice = scraper.get_price
    # productDescription = scraper.get_description(u)
    productSpecifications = scraper.get_specifications
    productOptions = scraper.get_options
    productShipping = scraper.get_shipping(u)

    puts "--------------"
    puts "Name:"
    puts "#{productName}"
    puts "--------------"
    puts "Price:"
    puts "#{productPrice}"
    puts "--------------"
    puts "Shipping:"
    puts "#{productShipping}"
    puts "--------------"
    puts "Specifications:"
    puts "#{productSpecifications}"
    puts "--------------"
    puts "Options:"
    puts "#{productOptions}"
    puts "--------------"

  end
end

