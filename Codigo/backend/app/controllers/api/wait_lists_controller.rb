module Api
  class WaitListsController < ApplicationController
    before_action :set_wait_list, only: %i[show update destroy]

    # GET /wait_lists
    def index
      @wait_lists = WaitList.all
      render json: @wait_lists
    end

    # GET /wait_lists/1
    def show
      render json: @wait_list
    end

    # GET /wait_lists/clients_in_group/:group_id
    def get_clients_in_group_wait_list
      clients = WaitList.where(group_id: params[:group_id])
      render json: clients
    end

    # POST /wait_lists
    def create
      @wait_list = WaitList.new(wait_list_params)

      if @wait_list.save
        render json: @wait_list, status: :created, location: @wait_list
      else
        render json: @wait_list.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /wait_lists/1
    def update
      if @wait_list.update(wait_list_params)
        render json: @wait_list
      else
        render json: @wait_list.errors, status: :unprocessable_entity
      end
    end

    # DELETE /wait_lists/1
    def destroy
      @wait_list.destroy!
    end

    private
      def set_wait_list
        @wait_list = WaitList.find(params[:id])
      end

      def wait_list_params
        params.permit(:client_id, :group_id)
      end
  end
end
