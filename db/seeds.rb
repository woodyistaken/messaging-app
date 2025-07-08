# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user1=User.create(email: "a@b", password: "123456")
user2=User.create(email: "b@a", password: "123456")
user1.friends.push(user2)
user2.friends.push(user1)

friendship=user2.friendships.where(friended: user1).take
friendship.status="accepted"
friendship.save
otherFriendship=Friendship.where(friender: user1, friended: user2).take
otherFriendship.status="accepted"
otherFriendship.save
