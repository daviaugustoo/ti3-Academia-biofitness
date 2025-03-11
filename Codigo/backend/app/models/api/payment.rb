module Api
  class Payment < ApplicationRecord
    enum status: {paid: 0, created: 1, expired: 2}
  end
end
