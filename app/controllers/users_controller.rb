class UsersController < ApplicationController
  def new
    if logged?
      @data = {id: current_user.id.to_s, current_user: current_user} if logged?
    else
     @data = {id: '0', current_user: User.new()}
   end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in @user
      UserMailer.account_activation(@user).deliver_now
    else
      respond_to do |format|
        format.json do render :json => {status: false, errors: @user.errors.full_messages} end
      end
    end
  end

  def show
  end

  def edit
  end

  def update
  end

  def edit_pass
  end

  def account_activation
  end

  def password_reset
  end

  def search
    line = params[:user][:name]
    @search = []
    User.all.each do |user|
      @search<<user if (line.include?user.name)||
                      (line.include?user.surname)||
                      (user.name.include?line)||
                      (user.name.include?line)
    end
    respond_to do |format|
      format.js
    end
  end

  def friends
    @user = User.find_by(id: (params[:id]||current_user.id))
    @friends = @user.all_friends
  end

  def create_friend
    relation = FriendRelation.new(friend_relation_params)
    relation.friend_id = current_user.id
    relation.save
  end

  def destroy_friend
    @user = User.find_by(id: params[:user][:user_id])
    relation = (current_user.all_relations.find_by(friend_id: @user.id)||current_user.all_relations.find_by(user_id: @user.id))
    relation.destroy
  end

  private
    def user_params
      params.permit(:name, :surname, :gender, :email, :password, :password_confirmation)
    end

    def friend_relation_params
      params.require(:friend_relation).permit(:user_id)
    end

    def validation_hash
      { :name => params[:user][:name],
        :surname => params[:user][:surname],
        :gender => 'male',
        :email => 'true_email@exemple.com',
        :password => 'Validpass1',
        :password_confirmation => 'Validpass1' }
    end
end
