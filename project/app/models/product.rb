class Product < ApplicationRecord
    has_many :line_items, dependent: :destroy
    validates :name, presence: true, uniqueness: true

    mount_uploader :image, ImageUploader
end
