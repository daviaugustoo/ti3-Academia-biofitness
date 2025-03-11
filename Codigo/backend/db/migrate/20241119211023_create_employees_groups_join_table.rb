class CreateEmployeesGroupsJoinTable < ActiveRecord::Migration[7.1]
  def change
    create_join_table :employees, :groups do |t|
    end
  end
end
