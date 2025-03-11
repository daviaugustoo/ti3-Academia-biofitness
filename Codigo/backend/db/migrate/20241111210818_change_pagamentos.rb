class ChangePagamentos < ActiveRecord::Migration[7.1]
  def change
    add_column :pagamentos, :status, :string
    remove_column :pagamentos, :paid
  end
end
