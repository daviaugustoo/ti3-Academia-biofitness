module Api
  class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :update, :destroy, :index_client_group, :add_client_to_group, :remove_group_from_client]

    # POST group
    def create
      begin
        group = Group.new(group_params)
        if group.save!
          render(json: group)
        end
      rescue StandardError => e
        render(json: { error: e })
      end
    end

    # READ all groups
    def index
      begin
        groups = Group.all
        render(json: groups)
      rescue StandardError => e
        render(json: { error: e })
      end
    end

    def index_client_group
      begin
        render(json: @group.clients)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def add_client_to_group
      begin
        clients = Client.where(id: params[:client_id])
        @group.clients << clients
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def remove_group_from_client
      begin
        clients = Client.where(id: params[:client_id])
        @group.clients.destroy(clients)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ one group
    def show
      begin
        render(json: @group)
      rescue StandardError => e
        render(json: { error: e })
      end
    end

    # UPDATE group
    def update
      begin
        @group.update!(group_params)
        if @group.save!
          render(json: @group)
        end
      rescue StandardError => e
        render(json: { error: e })
      end
    end

# DELETE /groups/:id
def destroy
  begin
    @group = Group.find(params[:id])
    @group.destroy
    render(json: { message: 'Group deleted successfully' }, status: :ok)
  rescue ActiveRecord::RecordNotFound
    render(json: { error: 'Group not found' }, status: :not_found)
  rescue StandardError => e
    render(json: { error: e.message }, status: :internal_server_error)
  end
end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def group_params
      params.require(:group).permit(:name, :instructor, :max_members, :time, :week_day)
    end
  end
end
