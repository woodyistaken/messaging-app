class Api::MessagesController < ApplicationController
  def get_user
    if current_user
      render json: { user: current_user.email }
      return
    end
    render json: { user: nil }
  end
  def get_sent_messages
    messages=current_user.sent_messages.map do |messageObject|
      { id: messageObject.id, message: messageObject.message, to: User.find(messageObject.receiver_id).email }
    end
    render json: { messages: messages }
  end
  def get_received_messages
    messages=current_user.received_messages.map do |messageObject|
      { id: messageObject.id, message: messageObject.message, from: User.find(messageObject.sender_id).email }
    end
    render json: { messages: messages }
  end
end
