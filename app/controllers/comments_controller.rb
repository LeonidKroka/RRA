class CommentsController < ApplicationController
  def create
    @user = User.find_by(id: params[:user_id])
    comment = current_user.comments.create(post_params)
  end

  def destroy
    puts params.inspect
    @user = User.find_by(id: params[:user_id])
    current_user.comments.find_by(id: params[:id]).destroy
  end

  def show
  end

  private
    def post_params
      params.require(:comment).permit(:post_id, :text)
    end
end
