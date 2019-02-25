require 'HTTParty'
require 'Nokogiri'
require 'pry'
require_relative 'Looper'
#require 'Open_uri'


class Scraper

	attr_accessor :parse_page, :url
	def initialize(url)
		doc = HTTParty.get(url)
		@parse_page ||= Nokogiri::HTML(doc)
	end

	def get_name
    parse_page.css(".product-name").children.first.content
		#parse_page.css(".product-name").children.map { |name| name.text }.compact
	end

  def get_price
    parse_page.css(".p-price").children.first.content
    #parse_page.css(".p-price").children.map { |name| name.text }.compact
  end

  # def get_description

  # end

  # def get_shipping

  # end

  # def get_price

  # end

  # def get_option1

  # end

  # def get_option1items

  # end

  # def get_specifications

  # end

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

    puts "--------------"
    puts "Name:"
    puts "#{productName}"
    puts "--------------"
    puts "Price:"
    puts "#{productPrice}"
    puts "--------------"

  end
end

