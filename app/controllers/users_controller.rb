class UsersController < ApplicationController
  def new
    @user = User.new()
  end

  def create
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
      params.require(:user).permit(:name, :surname, :gender, :email, :password, :password_confirmation)
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

    def correct_user
      redirect_to root_path unless (current_user == User.find_by(id: params[:id]))
    end
end
