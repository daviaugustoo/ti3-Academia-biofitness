module Api
  class UsersController < ApplicationController
    before_action :set_user, only: [:update, :show, :destroy, :add_user_to_group, :index_user_group, :remove_group_from_user]

    # POST user
    def create
      begin
        user = User.new(user_params)
        if params[:group_id].present?
          groups = Group.find(params[:group_id])
          user.groups << groups
        end
        if user.save!
          render(json: user)
        end
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ all users
    def index
      begin
        users = User.all
        render(json: users)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def index_user_group
      begin
        render(json: @user.group)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def user_by_name
      begin
        user = User.find_by(name: params[:name])
        render(json: user)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def add_user_to_group
      begin
        groups = Group.where(id: params[:group_id])
        @user.group << groups
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    def remove_group_from_user
      begin
        groups = Group.where(id: params[:group_id])
        @user.group.destroy(groups)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # READ one user
    def show
      begin
        @user = User.find(params[:id])
        render(json: @user)
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # UPDATE User
    def update
      begin
        @user.update!(user_params)
        if @user.save!
          render(json: @user)
        end
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    # DELETE User
    def destroy
      begin
        @user.destroy
        render(json: { message: 'User deleted successfully' })
      rescue StandardError => e
        render(json: { error: e.message })
      end
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.permit(:name, :subscription_fee, :cpf, :phone_number, :access_level, :birthday, :gender, :job, :gym_goal, :health_issues)
    end
  end
end