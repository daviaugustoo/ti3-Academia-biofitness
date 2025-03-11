class AddDayColumnToGroup < ActiveRecord::Migration[7.1]
  def change
    add_column(:groups, :week_day, :string)
  end
end
