class AddPaidDayPagamentos < ActiveRecord::Migration[7.1]
  def change
    add_column :pagamentos, :day_paid, :date
  end
end
