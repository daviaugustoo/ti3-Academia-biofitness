class MoreChanges < ActiveRecord::Migration[7.1]
  def change
    rename_table(:users, :clients)
    rename_table(:pagamentos, :payments)
    add_column(:groups, :status, :integer)
    change_column(:clients, :gender, :integer)
  end
end
