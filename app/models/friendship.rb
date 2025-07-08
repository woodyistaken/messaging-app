class Friendship < ApplicationRecord
  belongs_to :friender, class_name: :User, foreign_key: "friender_id"
  belongs_to :friended, class_name: :User, foreign_key: "friended_id"
  enum :status, { pending: 0, accepted: 1 }, presense: true
end
