require 'pry'

class Looper
	attr_accessor :urls

	def initialize
		@urls = [
			"https://www.aliexpress.com/item/500g-thick-super-chunky-yarn-soft-big-cotton-Roving-Spinning-hand-knitting-yarn-DIY-pet-dog/32963764970.html?spm=2114.search0104.3.1.676b3c7cBT59xE&ws_ab_test=searchweb0_0,searchweb201602_6_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10902_10059_10884_10887_321_322_10103,searchweb201603_35,ppcSwitch_0&algo_expid=227c71d7-813a-49b3-ad29-a27124dfb1bc-0&algo_pvid=227c71d7-813a-49b3-ad29-a27124dfb1bc&transAbTest=ae803_3",
			"https://www.aliexpress.com/item/hot-DIY-soft-wearable-chunky-knit-blanket-handmade-king-size-Thicken-thread-blanket-200-sofa-floor/32962224548.html?spm=2114.search0104.3.37.676b3c7cBT59xE&ws_ab_test=searchweb0_0,searchweb201602_6_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10902_10059_10884_10887_321_322_10103,searchweb201603_35,ppcSwitch_0&algo_expid=227c71d7-813a-49b3-ad29-a27124dfb1bc-5&algo_pvid=227c71d7-813a-49b3-ad29-a27124dfb1bc&transAbTest=ae803_3",
			"https://www.aliexpress.com/item/Large-Soft-Hand-Chunky-Wool-Knitted-Blanket-Thick-Yarn-Merino-Wool-Bulky-Knitting-Sofa-Throw-Winter/32967181241.html?spm=2114.search0104.3.69.676b3c7cBT59xE&ws_ab_test=searchweb0_0,searchweb201602_6_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10902_10059_10884_10887_321_322_10103,searchweb201603_35,ppcSwitch_0&algo_expid=227c71d7-813a-49b3-ad29-a27124dfb1bc-9&algo_pvid=227c71d7-813a-49b3-ad29-a27124dfb1bc&transAbTest=ae803_3",
			"https://www.aliexpress.com/item/Soft-Blanket-Fluff-Plush-Portable-Blanket-Bed-Cover-Sleeping-Supplies-Travel-Office-Use-Home-textile-Quilt/32945809889.html?spm=2114.search0104.3.115.676b3c7cBT59xE&ws_ab_test=searchweb0_0,searchweb201602_6_10065_10130_10068_10890_10547_319_10546_317_10548_10545_10696_453_10084_454_10083_10618_10307_537_536_10902_10059_10884_10887_321_322_10103,searchweb201603_35,ppcSwitch_0&algo_expid=227c71d7-813a-49b3-ad29-a27124dfb1bc-15&algo_pvid=227c71d7-813a-49b3-ad29-a27124dfb1bc&transAbTest=ae803_3"
		]
	end

	def get_urls
		urls
	end
end