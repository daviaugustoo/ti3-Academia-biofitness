class AddUserColumn < ActiveRecord::Migration[7.1]
  def change
    add_column(:users, :health_issues, :string)
    add_column(:users, :gym_goal, :string)
  end
end
