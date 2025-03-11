class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string(:name)
      t.float(:salary)
      t.string(:cpf)
      t.string(:phone_number)
      t.string(:address)
      t.float(:total_hours_worked)
      t.date(:birth_date)
      t.string(:position)
      t.time(:begin_shift)
      t.time(:end_shift)
      t.timestamps
    end
  end
end
