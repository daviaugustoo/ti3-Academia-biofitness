class ChangeStuff < ActiveRecord::Migration[7.1]
  def change
    remove_column :employees, :position
    add_column :employees, :access_level, :string
    change_column :pagamentos, :status, :integer
  end
end
