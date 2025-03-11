require "test_helper"

class WaitListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @wait_list = wait_lists(:one)
  end

  test "should get index" do
    get wait_lists_url, as: :json
    assert_response :success
  end

  test "should create wait_list" do
    assert_difference("WaitList.count") do
      post wait_lists_url, params: { wait_list: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show wait_list" do
    get wait_list_url(@wait_list), as: :json
    assert_response :success
  end

  test "should update wait_list" do
    patch wait_list_url(@wait_list), params: { wait_list: {  } }, as: :json
    assert_response :success
  end

  test "should destroy wait_list" do
    assert_difference("WaitList.count", -1) do
      delete wait_list_url(@wait_list), as: :json
    end

    assert_response :no_content
  end
end
