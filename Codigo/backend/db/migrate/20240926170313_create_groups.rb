 class CreateGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups do |t|
      t.string :name
      t.datetime :deleted_at
      t.string :time
      t.int :max_users
      t.timestamps
    end
  end
 end
