class ChangeWeekDayTypeInGroups < ActiveRecord::Migration[7.1]
  def up
    change_column :groups, :week_day, :integer
  end

  def down
    change_column :groups, :week_day, :string
  end
end
