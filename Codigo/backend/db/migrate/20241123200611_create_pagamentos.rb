class CreatePagamentos < ActiveRecord::Migration[6.1]
  def change
    create_table :pagamentos do |t|
      t.integer :client_id
      t.float :price
      t.date :expiration_date
      t.integer :status
      t.date :day_paid

      t.timestamps
    end
  end
end
