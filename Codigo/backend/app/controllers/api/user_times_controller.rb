class UserTimesController < ApplicationController
  before_action :set_user_time, only: %i[ show update destroy ]

  # GET /user_times
  def index
    @user_times = UserTime.all

    render json: @user_times
  end

  # GET /user_times/1
  def show
    render json: @user_time
  end

  # POST /user_times
  def create
    @user_time = UserTime.new(user_time_params)

    if @user_time.save
      render json: @user_time, status: :created, location: @user_time
    else
      render json: @user_time.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_times/1
  def update
    if @user_time.update(user_time_params)
      render json: @user_time
    else
      render json: @user_time.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_times/1
  def destroy
    @user_time.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_time
      @user_time = UserTime.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_time_params
      params.fetch(:user_time, {})
    end
end
