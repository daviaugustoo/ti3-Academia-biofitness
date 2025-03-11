class CreateClientsGroupsJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :clients, :groups do |t|
      t.index :client_id
      t.index :group_id
    end
  end
end
