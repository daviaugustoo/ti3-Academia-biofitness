Rails.application.routes.draw do

  namespace :api do
    resources :wait_lists
    resources :groups
    resources :clients
    resources :employees
    resources :pagamentos do
      collection do
        get 'find_by_client'
        patch 'update_by_client'
      end
    end
    resources :historico_pagamentos do
      collection do
        get 'find_by_client'
        patch 'update_by_client'
      end
    end

    get "wait_lists/clients_in_group/:group_id", to: "wait_lists#get_clients_in_group_wait_list"
    get "clients/client_by_name/:name", to: "clients#client_by_name"
    get "clients/client_groups/:id", to: "clients#index_client_group"
    get "groups/client_groups/:id", to: "groups#index_client_group"
    post "clients/:id/:group_id", to: "clients#add_client_to_group"
    post "groups/:id/:client_id", to: "groups#add_client_to_group"
    delete "clients/delete/:id/:group_id", to: "clients#remove_group_from_client"
    delete "groups/delete/:id/:client_id", to: "groups#remove_group_from_client"
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
