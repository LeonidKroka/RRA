class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticated?(:password, params[:session][:password])
      log_in user
      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
    else
      flash.now[:error] = 'Invalid login/password'
    end
  end

  def destroy
    log_out if logged?
    redirect_to root_path
  end
end
