class Api::MessagesController < ApplicationController
  def index
    if :authenticate_user
      render json: { asdf: "asfd" }
      return
    end
    render json: { pain: "pain" }
  end
end
