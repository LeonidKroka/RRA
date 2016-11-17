require 'uri'

module UsersHelper
  def get_avatar user
    user.images.order('id DESC').all.each {|img| return img.image.avatar.url if img.avatar}
    nil
  end

  def get_ico user
    user.images.order('id DESC').all.each {|img| return img.image.thumb.url if img.avatar}
  end

  def get_nine_friends user
    user.all_friends.count < 10 ? user.all_friends : user.all_friends.limit(9)
  end

  def is_friend? user
    current_user.all_friends.include?(user)
  end

  def date_format strtime
    strtime.strftime('%B %d, %H:%M:%S')
  end

  def post_comments post
    Comment.where('CAST(post_id AS text) LIKE ?', post.id.to_s)
  end

  def author comment
    User.find_by(id: comment.user_id)
  end

  def creator post
    User.find_by(id: post.user_id)
  end

  def news
    friend_ids = current_user.friends.map {|men| men.id} + current_user.inverse_friends.map {|men| men.id}
    Post.where('CAST(user_id AS INT) IN (?)', friend_ids)
  end

  def new_images
    friend_ids = current_user.friends.map {|men| men.id} + current_user.inverse_friends.map {|men| men.id}
    Image.where('CAST(user_id AS INT) IN (?)', friend_ids)
  end

  def get_utube text
    url = URI.extract(text)
    url[0] if !(url.count==0)
  end

  def get_user msg
    user = User.find_by(id: msg.user_id)
  end
end
