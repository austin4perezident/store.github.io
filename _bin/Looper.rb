require 'pry'

class Looper
	attr_accessor :urls

	def initialize
		@urls = [ "https://www.aliexpress.com/store/product/300ml-Air-Humidifier-Essential-Oil-Diffuser-Aroma-Lamp-Aromatherapy-Electric-Aroma-Diffuser-Mist-Maker-for-Home/1396009_32790148693.html?spm=2114.12010615.8148356.1.b6564bebR82ViT&spm=a2g1y.12024536.hotSpots_7343090.0","https://www.aliexpress.com/wholesale?catId=0&initiative_id=AS_20190219123756&SearchText=big+knitted+blanket","https://www.aliexpress.com/item/D-J-Wool-Rope-Photo-Props-Backdrop-Background-Baby-Photography-Prop-Handmade-Crochet-Knitted-Blankets-For/32913914733.html?spm=2114.search0103.3.324.5d812206UCq6Fu&ws_ab_test=searchweb0_0,searchweb201602_6_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10902_10059_10884_10887_321_322_10103,searchweb201603_57,ppcSwitch_0&algo_expid=11ebf238-11b5-4352-9af6-4a4bef64b7e4-46&algo_pvid=11ebf238-11b5-4352-9af6-4a4bef64b7e4&transAbTest=ae803_3","https://www.aliexpress.com/item/500g-thick-super-chunky-yarn-soft-big-cotton-Roving-Spinning-hand-knitting-yarn-DIY-pet-dog/32963764970.html?spm=2114.search0104.3.18.28911dfdmXVDxv&ws_ab_test=searchweb0_0,searchweb201602_6_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10902_10059_10884_10887_321_322_10103,searchweb201603_57,ppcSwitch_0&algo_expid=29a0b516-ed63-4227-a6bb-339753f65c81-2&algo_pvid=29a0b516-ed63-4227-a6bb-339753f65c81&transAbTest=ae803_3"]
	end

	def get_urls
		urls
	end
end