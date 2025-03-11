class AddInstructorToGroups < ActiveRecord::Migration[7.1]
  def change
    add_column :groups, :instructor, :string
  end
end