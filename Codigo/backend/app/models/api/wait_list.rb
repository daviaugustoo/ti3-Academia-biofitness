module Api
  class WaitList < ApplicationRecord
    has_one :group, class_name: "Api::Group", foreign_key: "group_id"
    has_one :client, class_name: "Api::Client", foreign_key: "client_id"
  end
end
