require 'test_helper'

class ProfileTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    log_in_new_user
    visit user_path @user
  end

  def test_own_page
    assert page.has_content?("User's activity")
    within('.yield_pages') do
      assert page.has_content? @user.name
      assert page.has_content? @user.surname
      assert page.has_content?("Write your new post")
    end
    assert_equal 1, page.all('.go-up').count
  end

  def test_create_new_post
    assert_equal 0, Post.all.count
    click_on 'Write your new post'
    find('.post-create-body').set('sometext')
    click_on 'Send'
    assert page.has_content?("sometext")
    assert page.has_content?("Comment")
    assert page.has_content?("+ 0")
    assert_equal 1, Post.all.count
    assert_equal 1, page.all('.post').count
    assert page.has_content?"November"
    assert page.has_link?"Delete"
  end

  def test_create_comment
    Post.create(user_id: @user.id, text: "something")
    visit user_path @user
    assert page.has_content?("something")
    find('.to-comment').click
    assert page.has_content?("Send")
  end

  def test_comment_view
    post = Post.create(user_id: @user.id, text: "something")
    Comment.create(user_id: @user.id, post_id: post.id, text: "something else")
    visit user_path @user
    assert page.has_content?("something else")
  end
end
