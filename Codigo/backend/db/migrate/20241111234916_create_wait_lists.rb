class CreateWaitLists < ActiveRecord::Migration[7.1]
  def change
    create_table :wait_lists do |t|

      t.timestamps
    end
  end
end
