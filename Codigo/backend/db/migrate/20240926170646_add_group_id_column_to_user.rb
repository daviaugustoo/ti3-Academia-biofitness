class AddGroupIdColumnToUser < ActiveRecord::Migration[7.1]
  def change
    add_column(:users, :group_id, :int)

    add_foreign_key :groups, :users, column: :group_id, primary_key: :id

  end
end
