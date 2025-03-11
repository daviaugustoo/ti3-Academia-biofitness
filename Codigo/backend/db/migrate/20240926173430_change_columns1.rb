class ChangeColumns1 < ActiveRecord::Migration[7.1]
  def change
    add_column(:users, :birthday, :datetime)
    add_column(:users, :gender, :string)
    add_column(:users, :job, :string)


    add_column(:groups, :max_members, :int)
    add_column(:groups, :time, :string)

  end
end
