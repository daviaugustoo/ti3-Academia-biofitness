module Api
  class Client < ApplicationRecord
    has_and_belongs_to_many :group
    has_many :payments, foreign_key: :client_id

    enum gender: {Mulher: 0, Homem: 1, Outro: 2}
    after_create :create_pagamento

    private

    def create_pagamento
    Pagamento.create(client_id: self.id, price: self.subscription_fee, expiration_date: Date.today + 30.days, status: 1)
    end
  end
end
