class WaitListParameters < ActiveRecord::Migration[7.1]
  def change
    add_column(:wait_lists, :user_id, :integer)
    add_column(:wait_lists, :group_id, :integer)
  end
end
