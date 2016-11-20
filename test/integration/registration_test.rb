require 'test_helper'

class RegistrationTest < ActionDispatch::IntegrationTest
  include UserTestHelper

  def setup
    visit '/'
  end

  def test_log_in_by_wrong_data
    find('.click-to-create').click
    within('.registration') do
      find('#user_name').set(valid_user[:name])
      find('#user_surname').set(valid_user[:surname])
      find('#user_email').set(valid_user[:email])
      find('#user_password').set(valid_user[:password])
      click_on "It's ok!"
    end
    within('.header') { assert page.has_content?('Log in') }

    find('.click-to-create').click
    within('.registration') do
      assert page.has_content?("Gender can't be blank")
      assert_equal 2, page.all('.error-msg li').count
    end
  end

  def test_log_in
    find('.click-to-create').click
    within('.registration') do
      find('#user_name').set(valid_user[:name])
      find('#user_surname').set(valid_user[:surname])
      find('#user_email').set(valid_user[:email])
      find(:css, "#user_gender_male").set(true)
      find('#user_password').set(valid_user[:password])
      find('#user_password_confirmation').set(valid_user[:password_confirmation])
      click_on "It's ok!"
    end
    within('.header') { assert page.has_content?(valid_user[:surname]) }
  end
end
