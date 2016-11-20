require 'test_helper'

class PagesTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    log_in_new_user
  end

  def test_visit_ather_user_page
    visit user_path @friend
    assert page.has_content? @friend.name
    assert page.has_content? @friend.surname
    assert page.has_content?("User's activity")
    assert page.has_no_content?("Write your new post")
    assert page.has_content?("Add to friend")
    assert page.has_content?("Send message")
  end

  def test_visit_messages_page
    @friend.messages.create(text: "sometext", receiver_id: @user.id)
    visit user_messages_path @user
    assert page.has_content? @friend.name
    assert page.has_content? @friend.surname
    assert page.has_content?(":")
    assert page.has_content?("sometext")
    assert_equal 1, page.all('.msg-avatar').count
  end

  def test_add_friend_and_visit_news_page
    @friend.posts.create(text: "sometext")
    visit user_path @friend
    click_on 'Add to friend'
    visit user_posts_path @user
    assert page.has_content? @friend.name
    assert page.has_content? @friend.surname
    assert page.has_content?(":")
    assert page.has_content?("sometext")
    assert_equal 1, @user.all_friends.count
  end

end
