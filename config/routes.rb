Rails.application.routes.draw do
  devise_for :users, controllers: {
        registrations: "users/registrations"
      }


  namespace :api do
    get "messages", to: "messages#get_user"
    get "messages/sent", to: "messages#get_sent_messages"
    get "messages/received", to: "messages#get_received_messages"
    post "messages/send", to: "messages#send_message"
    get "friends", to: "friends#index"
    post "friends/delete/:id", to: "friends#delete"
    post "friends/add/:id", to: "friends#create"
    post "friends/accept/:id", to: "friends#accept"
    get "friends/find/:search", to: "friends#get_users"
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root to: "homepage#index"
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get "/*path" => "homepage#index"
  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
