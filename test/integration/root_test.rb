require 'test_helper'

class RootTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    @user = User.create( valid_user )
    visit '/'
  end

  def test_header_and_footer_by_guest
    within('.header') do
      assert page.has_content?('Ant-eater')
      assert page.has_content?('Log in')
    end
    within('.header') { assert page.has_content?('Ant-eater') }
  end

  def test_log_in
    within('.login-form') do
      find('#session_email').set(@user.email)
      find('#session_password').set('wrong_pass')
      find(:css, "#session_remember_me").set(true)
      click_on "Log in"
    end
    assert page.has_content?('Invalid login/password')
    within('.login-form') do
      find('#session_email').set(@user.email)
      find('#session_password').set(@user.password)
      find(:css, "#session_remember_me").set(true)
      click_on "Log in"
    end
    within('.header') { assert page.has_content?(@user.surname) }
  end

  def test_menu_by_user
    log_in_new_user
    within('.main-menu') do
      assert page.has_content?('Profile')
      assert page.has_content?('Messages')
      assert page.has_content?('Friends')
      assert page.has_content?('Gallery')
    end
  end

  def test_header_by_user
    log_in_new_user
    within('.header') do
      find('li.dropdown').click
      assert page.has_content?('Log out')
      assert page.has_content?('Edit profile')
    end
  end
end
