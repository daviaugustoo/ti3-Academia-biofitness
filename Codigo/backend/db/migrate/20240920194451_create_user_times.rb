class CreateUserTimes < ActiveRecord::Migration[7.1]
  def change
    create_table :user_times do |t|
      t.time(:time)
      t.string(:week_day)
      t.boolean(:reserved)

      t.timestamps
    end
  end
end
