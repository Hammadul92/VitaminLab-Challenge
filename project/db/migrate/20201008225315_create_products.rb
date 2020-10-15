class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :image_url, null: true
      t.float :price, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
