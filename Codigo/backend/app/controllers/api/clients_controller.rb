module Api
  class ClientsController < ApplicationController
    before_action :set_client, only: [:update, :show, :destroy, :add_client_to_group, :index_client_group, :remove_group_from_client]

    # POST client
    def create
      begin
        client = Client.new(client_params)
        if client.save!
          render(json: client)
        end
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ all clients
    def index
      begin
        clients = Client.all
        render(json: clients)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def index_client_group
      begin
        render(json: @client.group)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def client_by_name
      begin
        client = Client.find_by(name: params[:name])
        render(json: client)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def add_client_to_group
      begin
        groups = Group.where(id: params[:group_id])
        @client.group << groups
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def remove_group_from_client
      begin
        groups = Group.where(id: params[:group_id])
        @client.group.destroy(groups)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ one client
    def show
      begin
        @client = Client.find(params[:id])
        render(json: @client)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # UPDATE client
    def update
      begin
        @client.update!(client_params)
        if @client.save!
          render(json: @client)
        end
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # DELETE client
    def destroy
      begin
        @client.destroy
        render(json: { message: 'Client deleted successfully' })
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    private

    def set_client
      @client = Client.find(params[:id])
    end

    def client_params
      params.permit(:name, :subscription_fee, :cpf, :phone_number, :birthday, :gender, :job, :gym_goal, :health_issues)
    end
  end
end
