class Api::FriendsController < ApplicationController
  def index
    # friends=current_user.friends.map do |friendObject|
    #   { friend: User.find(messageObject.receiver_id).email }
    # end
    friends=current_user.friends.map do |friendObject|
      { id: friendObject.id, email: friendObject.email, status: current_user.friendships.where(friended: friendObject).take.status }
    end
    render json: { friends: friends }
  end
  def create
    friend=User.find(params[:id])
    friend.friends.push(current_user)
    friendship=friend.friendships.where(friended: current_user).take
    friendship.status="pending"
    friendship.save
    render json: {}
  end
  def delete
    friend=User.find(params[:id])
    current_user.friendships.where(friended: friend).destroy_all
    friend.friendships.where(friended: current_user).destroy_all
    render json: {}
  end
  def accept
    friend=User.find(params[:id])
    friend.friends.push(current_user)
    friendship=current_user.friendships.where(friended: friend).take
    friendship.status="accepted"
    friendship.save
    otherFriendship=friend.friendships.where(friended: current_user).take
    otherFriendship.status="accepted"
    otherFriendship.save
    render json: {}
  end
  def get_users
    if params[:search]!="none"
      users=User.where("email LIKE ?", "%#{params[:search]}%").where.not(id: current_user.id).all
    else
      users=User.where.not(id: current_user.id).all
    end
    users=users.to_a.map do |user|
      friendship=user.friendships.where(friended: current_user).take
      if friendship==nil
        { id: user.id, email: user.email, status: nil }
      else
        { id: user.id, email: user.email, status: friendship.status }
      end
    end
    render json: { users: users }
  end
end
