class EvenMoreChanges < ActiveRecord::Migration[7.1]
  def change
    remove_column(:payments, :access_level)
    remove_column(:clients, :access_level)
    rename_table(:groups_users, :groups_clients)
    rename_column(:payments, :client, :client_id)
    rename_column(:groups_clients, :user_id, :client_id)
    rename_column(:wait_lists, :user_id, :client_id)
  end
end
