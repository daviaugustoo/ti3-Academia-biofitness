module Api
  class User < ApplicationRecord
    has_and_belongs_to_many :group
    has_many :pagamentos, foreign_key: :client

    after_create :create_pagamento

    def payments
      pagamentos
    end

    private

    def create_pagamento
      Pagamento.create(client: self.id, price: self.subscription_fee, expiration_date: Date.today + 30.days, status: false)
    end
  end
end