class CreatUsersGroupsJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_join_table :users, :groups do |t|
      t.integer(:user_id)
      t.integer(:group_id)
    end
  end
end
