module Api
  class PagamentosController < ApplicationController
    before_action :set_pagamento, only: %i[show update destroy]

    # GET /pagamentos
    def index
      @payment = Pagamento.all
      render json: @payment
    end

    # GET /pagamentos/1
    def show
      render json: @pagamento
    end

    # GET /pagamentos/find_by_client
    def find_by_client
      @payment = Pagamento.where(client_id: params[:client]) # Updated from client to client_id

      if @payment.any?
        render json: @payment
      else
        render json: { error: 'Pagamentos não encontrados' }, status: :not_found
      end
    end

    # PATCH /pagamentos/update_by_client
    def update_by_client
      @payment = Pagamento.where(client_id: params[:client]) # Updated from client to client_id

      if @payment.any?
        @payment.each do |pagamento|
          pagamento.update(pagamento_params)
        end
        render json: { success: true, message: 'Pagamentos atualizados com sucesso' }
      else
        render json: { error: 'Pagamentos não encontrados' }, status: :not_found
      end
    end

    # POST /pagamentos
    def create
      @pagamento = Pagamento.new(pagamento_params)

      if @pagamento.save
        render json: @pagamento, status: :created, location: @pagamento
      else
        render json: @pagamento.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /pagamentos/1
    def update
      if @pagamento.update(pagamento_params)
        render json: @pagamento
      else
        render json: @pagamento.errors, status: :unprocessable_entity
      end
    end

    # DELETE /pagamentos/1
    def destroy
      @pagamento.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_pagamento
      @pagamento = Pagamento.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pagamento_params
      params.require(:pagamento).permit(:client_id, :price, :expiration_date, :status, :day_paid)
    end
  end
end