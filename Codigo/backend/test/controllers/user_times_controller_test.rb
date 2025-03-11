require "test_helper"

class UserTimesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_time = user_times(:one)
  end

  test "should get index" do
    get user_times_url, as: :json
    assert_response :success
  end

  test "should create user_time" do
    assert_difference("UserTime.count") do
      post user_times_url, params: { user_time: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show user_time" do
    get user_time_url(@user_time), as: :json
    assert_response :success
  end

  test "should update user_time" do
    patch user_time_url(@user_time), params: { user_time: {  } }, as: :json
    assert_response :success
  end

  test "should destroy user_time" do
    assert_difference("UserTime.count", -1) do
      delete user_time_url(@user_time), as: :json
    end

    assert_response :no_content
  end
end
