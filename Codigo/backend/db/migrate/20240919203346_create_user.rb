class CreateUser < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string(:name, null: false)
      t.float(:subscription_fee, null: false)
      t.string(:cpf, null: false)
      t.string(:phone_number)
      t.string(:desease)
      t.string(:job)
      t.string(:gym_goal)
      t.date(:deleted_at, default: nil)
      t.string(:access_level)
      t.timestamps
    end
  end
end
