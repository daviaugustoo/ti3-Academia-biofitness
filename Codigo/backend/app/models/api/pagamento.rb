module Api
  class Pagamento < ApplicationRecord
    enum status: {paid: 0, created: 1, expired: 2}
  end
end
