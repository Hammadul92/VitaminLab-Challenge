class FixColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :products, :image_url, :image
  end
end
