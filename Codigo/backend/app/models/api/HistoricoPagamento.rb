module Api
  class HistoricoPagamento < ApplicationRecord
    self.table_name = 'historico_pagamentos'

    enum status: {paid: 0, created: 1, expired: 2}
  end
end
