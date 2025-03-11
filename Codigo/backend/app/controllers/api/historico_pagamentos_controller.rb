module Api
  class HistoricoPagamentosController < ApplicationController
    before_action :set_historico_pagamento, only: %i[show update destroy]

    # GET /historico_pagamentos
    def index
      @historico_pagamentos = HistoricoPagamento.all
      render json: @historico_pagamentos
    end

    # GET /historico_pagamentos/1
    def show
      render json: @historico_pagamento
    end

    # GET /historico_pagamentos/find_by_client
    def find_by_client
      @historico_pagamentos = HistoricoPagamento.where(client_id: params[:client])

      if @historico_pagamentos.any?
        render json: @historico_pagamentos
      else
        render json: { error: 'Pagamentos não encontrados' }, status: :not_found
      end
    end

    # PATCH /historico_pagamentos/update_by_client
    def update_by_client
      @historico_pagamentos = HistoricoPagamento.where(client_id: params[:client])

      if @historico_pagamentos.any?
        @historico_pagamentos.each do |historico_pagamento|
          historico_pagamento.update(historico_pagamento_params)
        end
        render json: { success: true, message: 'Pagamentos atualizados com sucesso' }
      else
        render json: { error: 'Pagamentos não encontrados' }, status: :not_found
      end
    end

    # POST /historico_pagamentos
    def create
      @historico_pagamento = HistoricoPagamento.new(historico_pagamento_params)

      if @historico_pagamento.save
        render json: @historico_pagamento, status: :created, location: @historico_pagamento
      else
        render json: @historico_pagamento.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /historico_pagamentos/1
    def update
      if @historico_pagamento.update(historico_pagamento_params)
        render json: @historico_pagamento
      else
        render json: @historico_pagamento.errors, status: :unprocessable_entity
      end
    end

    # DELETE /historico_pagamentos/1
    def destroy
      @historico_pagamento.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_historico_pagamento
      @historico_pagamento = HistoricoPagamento.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def historico_pagamento_params
      params.require(:historico_pagamento).permit(:client_id, :price, :expiration_date, :status, :day_paid)
    end
  end
end